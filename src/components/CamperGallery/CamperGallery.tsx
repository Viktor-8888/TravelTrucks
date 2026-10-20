// "use client";

// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import type { CamperImage } from "@/types/camper";
// import css from "./CamperGallery.module.css";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// interface CamperGalleryProps {
//   images: CamperImage[];
//   camperName: string;
// }

// export default function CamperGallery({
//   images,
//   camperName,
// }: CamperGalleryProps) {
//   if (images.length === 0) {
//     return null;
//   }

//   return (
//     <section>
//       <h2>Gallery</h2>

//       <Swiper
//         modules={[Navigation, Pagination]}
//         navigation
//         pagination={{ clickable: true }}
//         spaceBetween={16}
//         slidesPerView={1}
//       >
//         {images.map((image) => (
//           <SwiperSlide key={image.id}>
//             <div className={css.galleryImage}>
//               <Image
//                 src={image.original}
//                 alt={camperName}
//                 fill
//                 sizes="(max-width: 768px) 100vw, 800px"
//                 className={css.image}
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { CamperImage } from "@/types/camper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import css from "./CamperGallery.module.css";

interface CamperGalleryProps {
  images: CamperImage[];
  camperName: string;
}

export default function CamperGallery({
  images,
  camperName,
}: CamperGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSwiperOpen, setIsSwiperOpen] = useState(false);

  if (images.length === 0) {
    return null;
  }

  const activeImage = images[activeIndex];

  return (
    <section className={css.gallery}>
      <button
        type="button"
        className={css.mainImage}
        onClick={() => setIsSwiperOpen(true)}
        aria-label="Open camper photo gallery"
      >
        <Image
          src={activeImage.original}
          alt={camperName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 640px"
          className={css.image}
        />
      </button>

      <div className={css.thumbnails}>
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className={`${css.thumbnail} ${
              index === activeIndex ? css.activeThumbnail : ""
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show photo ${index + 1}`}
            aria-pressed={index === activeIndex}
          >
            <Image
              src={image.thumb}
              alt={`${camperName}, photo ${index + 1}`}
              fill
              sizes="120px"
              className={css.image}
            />
          </button>
        ))}
      </div>

      {isSwiperOpen && (
        <div
          className={css.modal}
          role="dialog"
          aria-modal="true"
          aria-label={`${camperName} photo gallery`}
          onClick={() => setIsSwiperOpen(false)}
        >
          <button
            type="button"
            className={css.closeButton}
            onClick={() => setIsSwiperOpen(false)}
            aria-label="Close gallery"
          >
            ×
          </button>

          <div
            className={css.swiperContainer}
            onClick={(event) => event.stopPropagation()}
          >
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              initialSlide={activeIndex}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              spaceBetween={16}
              slidesPerView={1}
            >
              {images.map((image, index) => (
                <SwiperSlide key={image.id}>
                  <div className={css.modalImage}>
                    <Image
                      src={image.original}
                      alt={`${camperName}, photo ${index + 1}`}
                      fill
                      sizes="90vw"
                      className={css.image}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </section>
  );
}
