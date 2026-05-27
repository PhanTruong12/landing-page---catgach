"use client";

import Image from "next/image";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.hero} id="hero">
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
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.badge}>
          Đà Nẵng · Hòa Xuân
        </div>

        <h1 className={styles.title}>
          <span className={styles.titleLine}>Xưởng Cắt Gạch</span>
          <span className={styles.titleLine}>
            <em>Trần Nam Trung</em>
          </span>
        </h1>

        <p className={styles.subtitle}>
          Cắt gạch, gia công và giao nhận tại Đà Nẵng.
          <br />
          Tối giản, rõ ràng và dễ dàng theo dõi.
        </p>

        <div className={styles.actions}>
          <a href="tel:0704599599" className="btn-primary" id="hero-phone-cta">
            <Phone size={16} />
            Gọi Ngay
          </a>
          <a
            href="https://zalo.me/0704599599"
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
          </button>
        </div>

        <div className={styles.infoStrip}>
          <div className={styles.infoItem}>
            <MapPin size={14} className={styles.infoIcon} />
            <span>5 Trần Nam Trung, Phường Hòa Xuân, Đà Nẵng</span>
          </div>
          <div className={styles.infoSep} />
          <div className={styles.infoItem}>
            <Phone size={14} className={styles.infoIcon} />
            <a href="tel:0704599599">0704 599 599</a>
          </div>
        </div>
      </div>
    </section>
  );
}
