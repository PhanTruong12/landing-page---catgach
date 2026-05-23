"use client";

import { motion, AnimatePresence } from "framer-motion";
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {expanded && (
              <motion.div
                className={styles.options}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
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
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            className={styles.mainBtn}
            onClick={() => setExpanded(!expanded)}
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            aria-label="Liên hệ nhanh"
            id="float-cta-toggle"
          >
            <Phone size={20} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
