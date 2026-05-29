"use client"

import { useEffect, useRef, useState } from "react"
import { BadgeCheck, Clock3, Gem, Handshake, Layers, ShieldCheck } from "lucide-react"
import { HighlightedText } from "./highlighted-text"

const trustStats = [
  { value: "Kinh nghiệm thực chiến", label: "Gia công gạch đá cho nhà phố, biệt thự và công trình thương mại." },
  { value: "Quy trình rõ ràng", label: "Tiếp nhận bản vẽ, gia công, đóng gói và giao hàng theo từng hạng mục." },
  { value: "Chất lượng ổn định", label: "Đường cắt granite, ceramic và đá tự nhiên đúng quy cách thi công." },
  { value: "Tiến độ cam kết", label: "Bàn giao đúng lịch để công trình tại Đà Nẵng luôn chủ động kế hoạch." },
]

const trustHighlights = [
  {
    title: "Kinh nghiệm lâu năm",
    description: "Đội ngũ giàu kinh nghiệm trong gia công gạch đá dân dụng và công trình thương mại.",
    icon: BadgeCheck,
  },
  {
    title: "Quy trình chuyên nghiệp",
    description: "Từ tiếp nhận bản vẽ, gia công, đóng gói đến giao hàng đều có quy chuẩn rõ ràng.",
    icon: Layers,
  },
  {
    title: "Sản phẩm chất lượng",
    description: "Đường cắt sắc gọn, đúng kích thước và đồng đều giữa các lô hàng bàn giao.",
    icon: Gem,
  },
  {
    title: "Giao hàng đúng hẹn",
    description: "Theo dõi tiến độ giao theo từng hạng mục để công trình luôn chủ động lịch thi công.",
    icon: Clock3,
  },
  {
    title: "Giá cả minh bạch",
    description: "Báo giá rõ ràng theo khối lượng và hạng mục, hạn chế phát sinh không cần thiết.",
    icon: ShieldCheck,
  },
  {
    title: "Được khách hàng tin tưởng",
    description: "Nhiều chủ nhà, đội thi công và đơn vị nội thất lựa chọn hợp tác lâu dài.",
    icon: Handshake,
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
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
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="pt-16 pb-8 md:pt-14 md:pb-6">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-8 md:mb-9">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">Giới thiệu năng lực</p>
          <h2 className="text-5xl font-medium leading-[1.1] tracking-tight mb-4 text-balance lg:text-6xl">
            <HighlightedText>Uy tín</HighlightedText> tạo nên
            <br />
            giá trị bền vững
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Chúng tôi tập trung vào chất lượng, tiến độ và sự minh bạch trong từng đơn hàng để mỗi công trình hoàn thiện
            đúng kế hoạch và đúng tiêu chuẩn.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8 md:mb-9">
          {trustStats.map((stat) => (
            <div key={stat.label} className="border border-border rounded-md p-4 bg-background/70">
              <p className="text-xl font-medium leading-snug mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
          {trustHighlights.map((item, index) => {
            const Icon = item.icon
            const isVisible = visibleItems.length === 0 || visibleItems.includes(index)
            return (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`relative pl-8 border-l border-border transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div
                  className={`transition-all duration-1000 ${isVisible ? "animate-draw-stroke" : ""}`}
                  style={{
                    transitionDelay: `${index * 120}ms`,
                  }}
                >
                  <Icon className="w-8 h-8 mb-3 text-foreground" strokeWidth={1.25} />
                </div>
                <h3 className="text-lg font-medium mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
