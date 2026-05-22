"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import styles from "./Contact.module.css";

const contactItems = [
  {
    icon: Phone,
    label: "Điện Thoại",
    value: "0936 789 363",
    href: "tel:0936789363",
    id: "contact-phone-link",
  },
  {
    icon: MapPin,
    label: "Địa Chỉ",
    value: "5 Trần Nam Trung, Phường Hòa Xuân, Đà Nẵng",
    href: "https://maps.google.com/?q=5+Tran+Nam+Trung,+Hoa+Xuan,+Da+Nang",
    id: "contact-map-link",
  },
  {
    icon: Clock,
    label: "Giờ Làm Việc",
    value: "Thứ 2 – Thứ 7" ,
    href: null,
    id: null,
  },
  {
    icon: MessageCircle,
    label: "Zalo",
    value: "0936 789 363 (Zalo)",
    href: "https://zalo.me/0936789363",
    id: "contact-zalo-link",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className={`section ${styles.section}`} id="contact" ref={ref}>
      <div className="container">
        <div className={styles.layout}>
          {/* Left side */}
          <motion.div
            className={styles.left}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">Liên Hệ</p>
            <h2 className="section-title">
              Liên Hệ
              <br />
              <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>Ngay Hôm Nay</em>
            </h2>
            <p className="section-subtitle" style={{ marginBottom: "3rem" }}>
              Gọi điện hoặc ghé thăm xưởng để được tư vấn miễn phí và nhận
              báo giá tốt nhất cho công trình của bạn.
            </p>

            <div className={styles.contactList}>
              {contactItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  className={styles.contactItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <div className={styles.contactIcon}>
                    <item.icon size={16} />
                  </div>
                  <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>{item.label}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className={styles.contactValue}
                        id={item.id ?? undefined}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className={styles.contactValue}>{item.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className={styles.ctaGroup}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <a href="tel:0936789363" className="btn-primary" id="contact-call-cta">
                <Phone size={16} />
                Gọi Ngay
              </a>
              <a
                href="https://zalo.me/0936789363"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                id="contact-zalo-cta"
              >
                <MessageCircle size={16} />
                Nhắn Zalo
              </a>
            </motion.div>
          </motion.div>

          {/* Right side – Map */}
          <motion.div
            className={styles.mapWrapper}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className={styles.mapFrame}>
              <iframe
                title="Bản đồ xưởng cắt gạch Trần Nam Trung"
                src="https://maps.google.com/maps?q=5%20Tran%20Nam%20Trung%2C%20Hoa%20Xuan%2C%20Da%20Nang&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                id="contact-google-map"
              />
              <div className={styles.mapOverlayPin}>
                <div className={styles.mapPinCard}>
                  <MapPin size={14} className={styles.mapPinIcon} />
                  <div>
                    <div className={styles.mapPinTitle}>Xưởng Cắt Gạch Trần Nam Trung</div>
                    <div className={styles.mapPinAddr}>5 Trần Nam Trung, Hòa Xuân, Đà Nẵng</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
