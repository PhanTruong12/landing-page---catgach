"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Clock, Users, Scissors } from "lucide-react";
import styles from "./About.module.css";

const stats = [
  { icon: Clock, value: "Nhanh", label: "Giao Hàng Nhanh Chóng" },
  { icon: Users, value: "500+", label: "Khách Hàng Tin Tưởng" },
  { icon: Scissors, value: "50K+", label: "M² Gạch Đã Cắt" },
  { icon: Award, value: "100%", label: "Cam Kết Chất Lượng" },
];

function StatCard({ icon: Icon, value, label, index }: { icon: React.ElementType; value: string; label: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={styles.statCard}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className={styles.statIcon}>
        <Icon size={18} />
      </div>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <div className={styles.layout}>
          {/* Text side */}
          <div className={styles.textSide}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <p className="section-label">Giới Thiệu</p>
              <h2 className="section-title">
                Nghề Cắt Gạch
                <br />
                <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>Chúng Tôi</em>
              </h2>
              <p className="section-subtitle" style={{ marginBottom: "1.25rem" }}>
                Xưởng cắt gạch Trần Nam Trung tại Đà Nẵng.
                <br />
                Dịch vụ linh hoạt, thực tế và dễ theo dõi cho từng đơn hàng.
              </p>
            </motion.div>
          </div>

          {/* Stats side */}
          <div className={styles.statsSide}>
            <div className={styles.statsGrid}>
              {stats.map((stat, i) => (
                <StatCard key={stat.label} {...stat} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
