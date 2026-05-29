export type ProjectMeta = {
  id: number
  slug: string
  title: string
  summary: string
  scope: string
  status: string
  category: string
  location: string
  year: string
}

export type ProjectWithImages = ProjectMeta & {
  feedbackImages: string[]
}
