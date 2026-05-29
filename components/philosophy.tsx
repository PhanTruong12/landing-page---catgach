"use client"

import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./highlighted-text"

const aboutServices = ["Gia công theo yêu cầu", "Đúng quy cách", "Giao đúng tiến độ"]

const workshopActivities = [
  {
    title: "Giao Gạch",
    description: "Vận chuyển và giao gạch đá tận nơi công trình, sắp lô theo từng hạng mục để thi công nhanh.",
    image: "/images/giao-gach.png",
  },
  {
    title: "Gia Công",
    description: "Gia công theo bản vẽ hoặc kích thước thực tế tại công trình, đảm bảo độ chính xác cao.",
    image: "/images/gia-cong.png",
  },
  {
    title: "Đóng Gói",
    description: "Phân loại, đánh mã và đóng gói theo từng tầng/khu vực để giảm rủi ro khi vận chuyển.",
    image: "/images/dong-goi.png",
  },
  {
    title: "Mài Cắt",
    description: "Mài cạnh và cắt hoàn thiện cho granite, ceramic và đá tự nhiên trước khi bàn giao.",
    image: "/images/mai-cat.png",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.25 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">About Us</p>
            <h2 className="text-6xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Về <HighlightedText>chúng tôi</HighlightedText>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-8">
              Xưởng chuyên gia công gạch đá tại Đà Nẵng với quy trình rõ ràng từ nhận đơn, gia công, đóng gói đến giao
              hàng công trình.
            </p>

            <div className="flex flex-wrap gap-3">
              {aboutServices.map((service) => (
                <span key={service} className="text-xs md:text-sm border border-border px-3 py-1.5 rounded-full text-muted-foreground">
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 lg:pt-24">
            {workshopActivities.map((activity, index) => (
              <div
                key={activity.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <article className="border border-border rounded-md overflow-hidden bg-background/70">
                  <div className="aspect-[4/3] bg-muted/30">
                    <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-medium mb-2">{activity.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{activity.description}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
