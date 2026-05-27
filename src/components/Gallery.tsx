"use client";

import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import styles from "./Gallery.module.css";

const galleryItems = [
  {
    id: 1,
    src: "/tile_hero.png",
    alt: "Xe giao gạch tận nơi",
    title: "Giao Gạch",
    subtitle: "Tận nơi, nhanh chóng",
    category: "Giao Hàng",
    wide: true,
  },
  {
    id: 2,
    src: "/tile_gallery1.png",
    alt: "Kỹ thuật cắt gạch chính xác",
    title: "Cắt Gạch",
    subtitle: "Đường cắt gọn nếp",
    category: "Gia Công",
    wide: false,
  },
  {
    id: 3,
    src: "/tile_gallery2.png",
    alt: "Gạch và đá đã hoàn thiện",
    title: "Gia Công",
    subtitle: "Chuẩn kích thước thiết kế",
    category: "Gia Công",
    wide: false,
  },
  {
    id: 4,
    src: "/tile_gallery3.png",
    alt: "Kho gạch đã cắt và sắp xếp",
    title: "Kho Gạch",
    subtitle: "Sắp xếp gọn gàng",
    category: "Kho",
    wide: false,
  },
];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightboxItem, setLightboxItem] = useState<(typeof galleryItems)[0] | null>(null);

  return (
    <section className="section" id="gallery" ref={ref}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">Hình Ảnh</p>
          <h2 className="section-title">Hình Ảnh Thực Tế</h2>
          <p className="section-subtitle">
            Giao hàng, cắt gạch, gia công và kho gạch đã hoàn thiện.
          </p>
        </div>

        <div className={styles.gallery}>
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`${styles.item} ${item.wide ? styles.wide : ""}`}
              onClick={() => setLightboxItem(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setLightboxItem(item)}
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
                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.itemSubtitle}>{item.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxItem && (
        <div
          className={styles.lightbox}
          onClick={() => setLightboxItem(null)}
        >
          <div
            className={styles.lightboxContent}
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
          </div>
        </div>
      )}
    </section>
  );
}
