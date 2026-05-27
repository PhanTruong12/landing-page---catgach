"use client";

import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "#about", label: "Giới Thiệu" },
  { href: "#services", label: "Dịch Vụ" },
  { href: "#gallery", label: "Bộ Sưu Tập" },
  { href: "#contact", label: "Liên Hệ" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className={styles.navbar}>
        <div className={`container ${styles.inner}`}>
          <a href="#" className={styles.logo}>
            <span className={styles.logoMark}>TN</span>
            <div className={styles.logoText}>
              <span className={styles.logoMain}>Trần Nam Trung</span>
              <span className={styles.logoSub}>Xưởng Cắt Gạch</span>
            </div>
          </a>

          <nav className={styles.navLinks}>
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={styles.navLink}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className={styles.navActions}>
            <a href="tel:0704599599" className={`btn-primary ${styles.phoneBtn}`} id="navbar-phone-cta">
              <Phone size={14} />
              <span>0704 599 599</span>
            </a>
            <button
              className={styles.menuBtn}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              id="navbar-menu-toggle"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <button
              key={link.href}
              className={styles.mobileLink}
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </button>
          ))}
          <a href="tel:0704599599" className={`btn-primary ${styles.mobilePhoneBtn}`}>
            <Phone size={14} />
            Gọi Ngay: 0704 599 599
          </a>
        </div>
      )}
    </>
  );
}
