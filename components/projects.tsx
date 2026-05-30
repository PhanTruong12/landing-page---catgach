"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
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
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-stretch">
            {projectItems.map((project) => (
              <article key={project.id} className="h-full flex flex-col rounded-md border border-border/70 bg-background/70 p-4 md:p-5">
                <div className="flex items-start justify-between gap-4 min-h-[176px]">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-medium leading-snug mb-2 min-h-[56px] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2 min-h-[40px] overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                      {project.category} - {project.location}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed min-h-[66px] overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                      {project.summary}
                    </p>
                  </div>
                  <div className="text-right shrink-0 flex flex-col items-end gap-2">
                    <span className="block text-muted-foreground/60 text-sm leading-none">{project.year}</span>
                    <span className="inline-flex min-w-[112px] items-center justify-center whitespace-nowrap text-xs leading-none px-3 py-1.5 rounded-full border border-border bg-background/80 text-muted-foreground">
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-border/60">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Ảnh công trình</p>
                  <div className="grid grid-cols-4 gap-2">
                    {(() => {
                      const previewLimit = 4
                      const previewImages = project.feedbackImages.slice(0, previewLimit)
                      const remainingCount = Math.max(project.feedbackImages.length - previewLimit, 0)
                      const slots = Array.from({ length: previewLimit }, (_, idx) => previewImages[idx] ?? null)

                      return slots.map((image, imageIndex) => {
                        if (!image) {
                          return (
                            <div
                              key={`${project.id}-empty-${imageIndex}`}
                              className="aspect-[4/3] rounded-md border border-dashed border-border/70 bg-muted/20 flex items-center justify-center text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70"
                            >
                              Đang cập nhật
                            </div>
                          )
                        }

                        const isLastPreview = imageIndex === previewLimit - 1
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
