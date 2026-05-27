"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle } from "lucide-react";
import styles from "./FloatingCTA.module.css";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.wrapper}>
      {expanded && (
        <div className={styles.options}>
          <a href="tel:0704599599" className={styles.option} id="float-cta-phone">
            <Phone size={16} />
            <span>Gọi Điện</span>
          </a>
          <a
            href="https://zalo.me/0704599599"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.option} ${styles.optionZalo}`}
            id="float-cta-zalo"
          >
            <MessageCircle size={16} />
            <span>Zalo</span>
          </a>
        </div>
      )}

      <button
        className={styles.mainBtn}
        onClick={() => setExpanded(!expanded)}
        aria-label="Liên hệ nhanh"
        id="float-cta-toggle"
        style={{ transform: expanded ? "rotate(45deg)" : "rotate(0deg)" }}
      >
        <Phone size={20} />
      </button>
    </div>
  );
}
