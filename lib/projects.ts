import "server-only"

import { promises as fs } from "node:fs"
import path from "node:path"
import type { ProjectMeta, ProjectWithImages } from "@/lib/project-types"

const PROJECTS_FILE = path.join(process.cwd(), "data", "projects.json")
const PROJECTS_IMAGE_ROOT = path.join(process.cwd(), "public", "projects")
const IMAGE_EXTENSIONS = new Set([".png"])

async function listProjectImages(slug: string): Promise<string[]> {
  const projectDir = path.join(PROJECTS_IMAGE_ROOT, slug)

  try {
    const entries = await fs.readdir(projectDir, { withFileTypes: true })
    const imageFiles = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))

    return imageFiles.map((name) => `/projects/${slug}/${name}`)
  } catch (error) {
    const err = error as NodeJS.ErrnoException
    if (err.code === "ENOENT") {
      return []
    }
    throw error
  }
}

export async function getProjects(): Promise<ProjectWithImages[]> {
  const raw = await fs.readFile(PROJECTS_FILE, "utf8")
  const projectItems = JSON.parse(raw.replace(/^\uFEFF/, "")) as ProjectMeta[]

  const withImages = await Promise.all(
    projectItems.map(async (project) => {
      const feedbackImages = await listProjectImages(project.slug)

      return {
        ...project,
        feedbackImages: feedbackImages.length > 0 ? feedbackImages : ["/placeholder.svg"],
      }
    }),
  )

  return withImages
}
