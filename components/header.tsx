"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navItems = [
    { label: "Về chúng tôi", href: "#about" },
    { label: "Dự án", href: "#projects" },
    { label: "Uy tín", href: "#services" },
    { label: "Hỏi đáp", href: "#faq" },
    { label: "Liên hệ", href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <header
      className={cn(
        "fixed z-50 transition-all duration-500 my-0 py-0 rounded-none left-4 right-4 rounded-2xl py-4 top-4",
        scrolled || mobileMenuOpen ? "bg-primary/95 backdrop-blur-md" : "bg-black/45 backdrop-blur-sm",
      )}
    >
        <nav className="container mx-auto px-6 md:px-[24]">
          <div className="flex items-center md:grid md:grid-cols-[1fr_auto_1fr] md:gap-5">
            <Link href="/" className="flex items-center gap-2 group md:justify-self-start" onClick={scrollToTop}>
              <span className="text-lg md:text-2xl font-bold tracking-wide text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.75)]">
                Cắt Gạch Trần Nam Trung
              </span>
            </Link>

            <ul className="hidden md:flex items-center gap-8 text-lg tracking-wide md:justify-self-center">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-[rgb(251,146,60)] transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-[rgb(251,146,60)] after:transition-all after:duration-300 text-white font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="tel:0704599599"
              className="hidden lg:inline-flex items-center gap-2.5 justify-self-end rounded-md border border-white/20 bg-white/8 px-4 py-2.5 text-sm text-white/90 hover:text-white hover:bg-white/15 transition-colors"
            >
              <span className="font-semibold whitespace-nowrap">0704.599.599</span>
              <span className="text-white/35">|</span>
              <span className="max-w-[280px] truncate">05 Trần Nam Trung, Hoà Xuân, Cẩm Lệ</span>
            </a>

            <button
              className="md:hidden ml-auto z-50 transition-colors duration-300 text-white"
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-[600px] opacity-100 mt-8" : "max-h-0 opacity-0",
          )}
        >
          <div className="container mx-auto px-6">
            <ul className="flex flex-col gap-6 mb-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-[rgb(251,146,60)] transition-colors duration-300 text-white text-3xl font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] block"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
    </header>
  )
}
