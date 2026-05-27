"use client";

import { Phone, MapPin, MessageCircle, ChevronUp } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logoMark}>TN</div>
            <div>
              <div className={styles.logoName}>Xưởng Cắt Gạch Trần Nam Trung</div>
              <div className={styles.logoTagline}>Chính Xác · Nhanh Chóng · Uy Tín</div>
            </div>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Điều Hướng</h4>
            <nav className={styles.colLinks}>
              {["#about", "#services", "#gallery", "#contact"].map((href, i) => {
                const labels = ["Giới Thiệu", "Dịch Vụ", "Gallery", "Liên Hệ"];
                return (
                  <a
                    key={href}
                    href={href}
                    className={styles.colLink}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {labels[i]}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Liên Hệ</h4>
            <div className={styles.contactLinks}>
              <a href="tel:0704599599" className={styles.contactLink}>
                <Phone size={13} />
                0704 599 599
              </a>
              <a
                href="https://zalo.me/0704599599"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <MessageCircle size={13} />
                Zalo: 0704 599 599
              </a>
              <a
                href="https://maps.google.com/?q=5+Tran+Nam+Trung,+Hoa+Xuan,+Da+Nang"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <MapPin size={13} />
                5 Trần Nam Trung, Hòa Xuân, Đà Nẵng
              </a>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Xưởng Cắt Gạch Trần Nam Trung. Đà Nẵng.
          </p>
          <button
            className={styles.scrollTop}
            onClick={scrollToTop}
            aria-label="Cuộn lên đầu trang"
            id="footer-scroll-top"
          >
            <ChevronUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
