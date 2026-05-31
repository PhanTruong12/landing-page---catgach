"use client"

import type React from "react"

export function HighlightedText({ children }: { children: React.ReactNode }) {
  return <span className="text-[#df8b3e]">{children}</span>
}
