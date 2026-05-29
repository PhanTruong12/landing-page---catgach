"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react"
import type { ProjectWithImages } from "@/lib/project-types"

type ProjectsProps = {
  projectItems: ProjectWithImages[]
}

export function Projects({ projectItems }: ProjectsProps) {
  const [lightboxProjectId, setLightboxProjectId] = useState<number | null>(null)
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0)

  const activeProject = projectItems.find((project) => project.id === lightboxProjectId)
  const activeImages = activeProject?.feedbackImages ?? []

  const openLightbox = (projectId: number, imageIndex: number) => {
    setLightboxProjectId(projectId)
    setLightboxImageIndex(imageIndex)
  }

  const closeLightbox = () => {
    setLightboxProjectId(null)
    setLightboxImageIndex(0)
  }

  const showPrevImage = () => {
    if (activeImages.length === 0) return
    setLightboxImageIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length)
  }

  const showNextImage = () => {
    if (activeImages.length === 0) return
    setLightboxImageIndex((prev) => (prev + 1) % activeImages.length)
  }

  useEffect(() => {
    if (!activeProject) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox()
      if (event.key === "ArrowLeft") showPrevImage()
      if (event.key === "ArrowRight") showNextImage()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [activeProject, activeImages.length])

  return (
    <>
      <section id="projects" className="py-32 md:py-29 bg-secondary/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Hạng mục thực tế</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Dự án đã triển khai</h2>
            </div>
            <a
              href="#services"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              Xem thêm dịch vụ
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-stretch">
            {projectItems.map((project) => (
              <article key={project.id} className="group cursor-pointer h-full flex flex-col">
                <div className="flex items-start justify-between gap-4 min-h-[148px]">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                      {project.category} - {project.location}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2 min-h-[56px] overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                      {project.summary}
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    <span className="block text-muted-foreground/60 text-sm">{project.year}</span>
                    <span className="inline-flex min-w-[102px] justify-center whitespace-nowrap text-[11px] px-2.5 py-1 rounded-full border border-border text-muted-foreground">
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="mt-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Ảnh công trình</p>
                  <div className="grid grid-cols-4 gap-2">
                    {(() => {
                      const previewLimit = 4
                      const previewImages = project.feedbackImages.slice(0, previewLimit)
                      const remainingCount = Math.max(project.feedbackImages.length - previewLimit, 0)

                      return previewImages.map((image, imageIndex) => {
                        const isLastPreview = imageIndex === previewImages.length - 1
                        const hasOverflow = remainingCount > 0 && isLastPreview
                        const openIndex = hasOverflow ? previewLimit : imageIndex

                        return (
                          <button
                            key={`${project.id}-${image}-${imageIndex}`}
                            type="button"
                            onClick={() => openLightbox(project.id, openIndex)}
                            className="relative aspect-[4/3] overflow-hidden rounded-md border border-border/70 bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            aria-label={`Mở ảnh feedback ${imageIndex + 1} của ${project.title}`}
                          >
                            <img
                              src={image}
                              alt={`Feedback ${imageIndex + 1} - ${project.title}`}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                            {hasOverflow && (
                              <span className="absolute inset-0 bg-black/55 text-white text-lg font-medium flex items-center justify-center">
                                +{remainingCount}
                              </span>
                            )}
                          </button>
                        )
                      })
                    })()}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeProject && (
        <div className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm" onClick={closeLightbox}>
          <div
            className="h-full w-full px-4 pt-4 md:px-8 md:pt-8 flex flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between text-white mb-4 md:mb-6">
              <div>
                <p className="text-sm md:text-base font-medium">{activeProject.title}</p>
                <p className="text-xs md:text-sm text-white/70">
                  Ảnh {lightboxImageIndex + 1}/{activeImages.length}
                </p>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                className="inline-flex items-center justify-center size-9 rounded-full border border-white/40 hover:bg-white/10"
                aria-label="Đóng gallery"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="relative flex items-center justify-center h-[52vh] md:h-[58vh] lg:h-[62vh]">
              <img
                src={activeImages[lightboxImageIndex]}
                alt={`Feedback ${lightboxImageIndex + 1} - ${activeProject.title}`}
                className="max-h-full max-w-full object-contain rounded-lg"
              />

              {activeImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrevImage}
                    className="absolute left-2 md:left-4 inline-flex items-center justify-center size-10 rounded-full border border-white/40 text-white hover:bg-white/10"
                    aria-label="Ảnh trước"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={showNextImage}
                    className="absolute right-2 md:right-4 inline-flex items-center justify-center size-10 rounded-full border border-white/40 text-white hover:bg-white/10"
                    aria-label="Ảnh tiếp theo"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}
            </div>

            <div
              className="mt-6 w-full max-w-5xl mx-auto pb-10 md:pb-14"
              style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}
            >
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {activeImages.map((image, index) => (
                  <button
                    key={`${activeProject.id}-thumb-${index}`}
                    type="button"
                    onClick={() => setLightboxImageIndex(index)}
                    className={`aspect-[4/3] w-full overflow-hidden rounded-md border bg-white/10 ${
                      index === lightboxImageIndex ? "border-white" : "border-white/30"
                    }`}
                    aria-label={`Xem ảnh ${index + 1}`}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
