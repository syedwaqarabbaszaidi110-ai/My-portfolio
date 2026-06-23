import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { gsap } from "gsap";

import "swiper/css";

import css3 from "../assets/css3.svg";
import html5 from "../assets/html5.svg";
import tailwindcss from "../assets/tailwindcss.svg";
import javascript from "../assets/javascript.svg";
import jquery from "../assets/jquery.svg";
import php from "../assets/php.svg";
import mysql from "../assets/mysql.svg";
import wordpress from "../assets/wordpress.svg";
import shopify from "../assets/shopify.svg";
import github from "../assets/github.svg";
import figma from "../assets/figma.svg";

const STACK = [
  { name: "CSS3", file: css3 },
  { name: "HTML5", file: html5 },
  { name: "Tailwind", file: tailwindcss },
  { name: "JavaScript", file: javascript },
  { name: "jQuery", file: jquery },
  { name: "PHP", file: php },
  { name: "MySQL", file: mysql },
  { name: "WordPress", file: wordpress },
  { name: "Shopify", file: shopify },
  { name: "GitHub", file: github },
  { name: "Figma", file: figma },
];

function Marquee() {
  const cardsRef = useRef([]);

  useEffect(() => {
    // entrance: cards fade/rise in on mount, staggered
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: "power3.out",
      },
    );
  }, []);

  const handleEnter = (el) => {
    gsap.to(el, {
      scale: 1.06,
      borderColor: "rgba(99, 179, 237, 0.5)",
      boxShadow: "0 0 24px rgba(99, 179, 237, 0.25)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLeave = (el) => {
    gsap.to(el, {
      scale: 1,
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section className="relative  overflow-hidden ">
      {/* signature element: soft edge-fade mask over the marquee */}
      <div className="relative">
        <div className="pointer-events-none transition-all duration-100 ease-in-out absolute inset-y-0 left-0 w-16 md:w-32 z-10 bg-gradient-to-r from-[var(--fade-color)] to-transparent" />
        <div className="pointer-events-none transition-all duration-100 ease-in-out absolute inset-y-0 right-0 w-16 md:w-32 z-10 bg-gradient-to-l from-[var(--fade-color)] to-transparent" />

        <Swiper
          modules={[Autoplay]}
          loop={true}
          loopAdditionalSlides={STACK.length}
          speed={4000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          allowTouchMove={false}
          breakpoints={{
            320: { slidesPerView: 2.5, spaceBetween: 14 },
            640: { slidesPerView: 4, spaceBetween: 18 },
            1024: { slidesPerView: 12, spaceBetween: 20 },
          }}
        >
          {[...STACK, ...STACK, ...STACK, ...STACK].map((item, index) => (
            <SwiperSlide key={index} className="py-10">
              <div
                ref={(el) => (cardsRef.current[index] = el)}
                onMouseEnter={(e) => handleEnter(e.currentTarget)}
                onMouseLeave={(e) => handleLeave(e.currentTarget)}
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  border
                  border-[var(--color-border)]
                  px-5
                  py-4
                  backdrop-blur-sm
                  cursor-pointer
                  select-none
                  transition-colors
                "
              >
                <img
                  src={item.file}
                  alt={item.name}
                  draggable={false}
                  className="w-7 h-7 object-contain shrink-0 grayscale-100"
                />
                <span className=" font-medium whitespace-nowrap text-sm md:text-base">
                  {item.name}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Marquee;
