"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Xưởng nhận cắt những loại vật liệu nào?",
    answer:
      "Chúng tôi nhận gia công gạch granite, gạch ceramic và đá tự nhiên theo kích thước thực tế hoặc theo bản vẽ thi công.",
  },
  {
    question: "Có nhận cắt len chân tường và gạch đá cầu thang không?",
    answer:
      "Có. Xưởng nhận cắt len chân tường theo module đồng nhất và gia công hạng mục gạch đá cầu thang theo từng bậc, từng chiếu nghỉ.",
  },
  {
    question: "Có dịch vụ cắt CNC và mosaic trang trí không?",
    answer:
      "Có. Chúng tôi nhận cắt CNC đá tự nhiên, gạch granite theo mẫu và gia công mosaic trang trí cho các khu vực điểm nhấn.",
  },
  {
    question: "Có giao hàng đến công trình tại Đà Nẵng không?",
    answer:
      "Có. Xưởng hỗ trợ giao hàng tận nơi công trình tại Đà Nẵng theo lịch thi công để đội lắp đặt chủ động tiến độ.",
  },
  {
    question: "Liên hệ đặt cắt gạch bằng cách nào?",
    answer:
      "Hotline: 0704.599.599. Xưởng: 05 Trần Nam Trung, Hoà Xuân, Cẩm Lệ, Đà Nẵng. Website công ty: tndgranite.com.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="pt-10 pb-20 md:pt-12 md:pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Hỏi đáp</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Câu hỏi thường gặp
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
