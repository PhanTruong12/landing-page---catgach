"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "#about", label: "Giới Thiệu" },
  { href: "#services", label: "Dịch Vụ" },
  { href: "#gallery", label: "Bộ Sưu Tập" },
  { href: "#contact", label: "Liên Hệ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
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
            <a href="tel:0936789363" className={`btn-primary ${styles.phoneBtn}`} id="navbar-phone-cta">
              <Phone size={14} />
              <span>0936 789 363</span>
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
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                className={styles.mobileLink}
                onClick={() => handleNavClick(link.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                {link.label}
              </motion.button>
            ))}
            <a href="tel:0936789363" className={`btn-primary ${styles.mobilePhoneBtn}`}>
              <Phone size={14} />
              Gọi Ngay: 0936 789 363
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
