"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import styles from "./Gallery.module.css";

const galleryItems = [
  {
    id: 1,
    src: "/tile_hero.png",
    alt: "Xe giao gạch tận nơi",
    title: "Giao Gạch",
    subtitle: "Tận nơi, nhanh chóng",
    category: "Giao Hàng",
    featured: true,
  },
  {
    id: 2,
    src: "/tile_gallery1.png",
    alt: "Kỹ thuật cắt gạch chính xác",
    title: "Cắt Gạch",
    subtitle: "Đường cắt gọn nếp",
    category: "Gia Công",
    featured: false,
  },
  {
    id: 3,
    src: "/tile_gallery2.png",
    alt: "Gạch và đá đã hoàn thiện",
    title: "Gia Công",
    subtitle: "Chuẩn kích thước thiết kế",
    category: "Gia Công",
    featured: false,
  },
  {
    id: 4,
    src: "/tile_gallery3.png",
    alt: "Kho gạch đã cắt và sắp xếp",
    title: "Kho Gạch",
    subtitle: "Sắp xếp gọn gàng",
    category: "Kho",
    featured: false,
  },
];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightboxItem, setLightboxItem] = useState<(typeof galleryItems)[0] | null>(null);

  return (
    <section className="section" id="gallery" ref={ref}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Hình Ảnh</p>
          <h2 className="section-title">Hình Ảnh Thực Tế</h2>
          <p className="section-subtitle">
            Giao hàng, cắt gạch, gia công và kho gạch đã hoàn thiện.
          </p>
        </motion.div>

        <div className={styles.preloadGallery} aria-hidden="true">
          <Image src="/tile_gallery1.png" alt="" width={1} height={1} />
          <Image src="/tile_gallery2.png" alt="" width={1} height={1} />
          <Image src="/tile_gallery3.png" alt="" width={1} height={1} />
        </div>

        {/* Masonry-style gallery */}
        <div className={styles.gallery}>
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              className={`${styles.item} ${item.featured ? styles.featured : ""}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              onClick={() => setLightboxItem(item)}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.image}
                />
                <div className={styles.itemOverlay}>
                  <div className={styles.itemBadge}>{item.category}</div>
                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.itemSubtitle}>{item.subtitle}</p>
                  </div>
                  <div className={styles.zoomIcon}>
                    <ZoomIn size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              className={styles.lightboxContent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.lightboxImageWrapper}>
                <Image
                  src={lightboxItem.src}
                  alt={lightboxItem.alt}
                  fill
                  className={styles.lightboxImage}
                  sizes="90vw"
                />
              </div>
              <div className={styles.lightboxInfo}>
                <span className={styles.lightboxCategory}>{lightboxItem.category}</span>
                <h3 className={styles.lightboxTitle}>{lightboxItem.title}</h3>
                <p className={styles.lightboxSubtitle}>{lightboxItem.subtitle}</p>
              </div>
              <button
                className={styles.lightboxClose}
                onClick={() => setLightboxItem(null)}
                aria-label="Đóng"
                id="gallery-lightbox-close"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
