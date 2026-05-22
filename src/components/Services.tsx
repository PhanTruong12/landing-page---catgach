"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Ruler, Gem, Zap, ShieldCheck, Layers, Wrench } from "lucide-react";
import styles from "./Services.module.css";

const services = [
  {
    icon: Ruler,
    title: "Cắt Gạch Theo Yêu Cầu",
    description:
      "Cắt gạch theo kích thước tùy chỉnh, bao gồm cắt thẳng, cắt vát, cắt nghiêng theo bản vẽ thiết kế.",
  },
  {
    icon: Gem,
    title: "Đá Granite & Đá Tự Nhiên",
    description:
      "Xử lý và cắt đá granite, đá marble, đá cẩm thạch, đá bazan với độ chính xác cao.",
  },
  {
    icon: Layers,
    title: "Gạch Men & Gạch Porcelain",
    description:
      "Cắt các loại gạch men, gạch porcelain, gạch thủy tinh kích thước lớn nhỏ theo yêu cầu.",
  },
  {
    icon: Zap,
    title: "Giao Hàng Nhanh",
    description:
      "Hỗ trợ giao hàng nhanh trong ngày tại Đà Nẵng. Ưu tiên đơn hàng khẩn cấp cho công trình.",
  },
  {
    icon: ShieldCheck,
    title: "Cam Kết Chất Lượng",
    description:
      "Đảm bảo mỗi viên gạch được cắt chính xác, đường cắt mịn, không sứt mẻ. Đổi trả nếu có lỗi.",
  },
  {
    icon: Wrench,
    title: "Tư Vấn Kỹ Thuật",
    description:
      "Tư vấn miễn phí về loại gạch, kiểu cắt, kỹ thuật lát phù hợp cho từng dự án của bạn.",
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className={`section ${styles.section}`} id="services" ref={ref}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Dịch Vụ</p>
          <h2 className="section-title">Những Gì Chúng Tôi Cung Cấp</h2>
          <p className="section-subtitle">
            Đa dạng dịch vụ cắt gạch đá chuyên nghiệp, phục vụ cả công trình dân dụng
            và thương mại tại Đà Nẵng và các vùng lân cận.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  description,
  index,
  inView,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.08 }}
    >
      <div className={styles.cardIcon}>
        <Icon size={20} />
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{description}</p>
      <div className={styles.cardDecor} aria-hidden="true" />
    </motion.article>
  );
}
