"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Phone, MapPin, MessageCircle } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.hero} id="hero">
      {/* Background Image */}
      <div className={styles.bgWrapper}>
        <Image
          src="/tile_hero.png"
          alt="Xưởng cắt gạch chuyên nghiệp Trần Nam Trung"
          fill
          priority
          className={styles.bgImage}
          sizes="100vw"
        />
        <div className={styles.overlay} />
        <div className={styles.gradientBottom} />
      </div>

      {/* Animated grid lines */}
      <div className={styles.gridLines} aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.gridLine}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>

      <div className={`container ${styles.content}`}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className={styles.badgeDot} />
          Đà Nẵng · Hòa Xuân
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          Xưởng Cắt Gạch
          <br />
          <em>Trần Nam Trung</em>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Cắt gạch, gia công và giao nhận tại Đà Nẵng.
          <br />
          Tối giản, rõ ràng và dễ dàng theo dõi.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          <a href="tel:0936789363" className="btn-primary" id="hero-phone-cta">
            <Phone size={16} />
            Gọi Ngay
          </a>
          <a
            href="https://zalo.me/0936789363"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            id="hero-zalo-cta"
          >
            <MessageCircle size={16} />
            Nhắn Zalo
          </a>
          <button onClick={scrollToAbout} className="btn-outline" id="hero-explore-btn">
            Khám Phá
            <ArrowDown size={14} />
          </button>
        </motion.div>

        <motion.div
          className={styles.infoStrip}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className={styles.infoItem}>
            <MapPin size={14} className={styles.infoIcon} />
            <span>5 Trần Nam Trung, Phường Hòa Xuân, Đà Nẵng</span>
          </div>
          <div className={styles.infoSep} />
          <div className={styles.infoItem}>
            <Phone size={14} className={styles.infoIcon} />
            <a href="tel:0936789363">0936 789 363</a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className={styles.scrollIndicator}
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        aria-label="Cuộn xuống"
      >
        <motion.div
          className={styles.scrollDot}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        />
      </motion.button>
    </section>
  );
}
