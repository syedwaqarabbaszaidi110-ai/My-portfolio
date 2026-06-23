import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: "fa-brands fa-wordpress",
    title: "WordPress Development",
    desc: "Custom WordPress websites with Elementor, ACF-powered dynamic content, custom post types, responsive layouts, and easy content management.",
  },
  {
    icon: "fa-brands fa-shopify",
    title: "Shopify Development",
    desc: "Shopify theme customization, Shopify 2.0 sections, Liquid development, app integrations, and conversion-focused eCommerce solutions.",
  },
  {
    icon: "fa-solid fa-code",
    title: "Figma to HTML",
    desc: "Convert Figma designs into pixel-perfect, responsive HTML, CSS, Tailwind CSS, JavaScript, and production-ready front-end code.",
  },
  {
    icon: "fa-solid fa-funnel-dollar",
    title: "GoHighLevel (GHL) Development",
    desc: "High-converting landing pages, sales funnels, CRM setup, workflow automation, forms, calendars, and lead generation systems.",
  },
  {
    icon: "fa-brands fa-wix",
    title: "Wix Development",
    desc: "Professional Wix websites with custom layouts, responsive design, business integrations, and user-friendly content management.",
  },
  {
    icon: "fa-solid fa-gauge-high",
    title: "SEO & Speed Optimization",
    desc: "On-page SEO, Core Web Vitals improvements, image optimization, caching, performance tuning, and faster page load times.",
  },
];

function Service() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // staggered reveal as the section scrolls into view
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      },
    );
  }, []);

  const handleEnter = (el) => {
    gsap.to(el, {
      y: -6,
      boxShadow: "0 12px 32px rgba(99, 179, 237, 0.18)",
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleLeave = (el) => {
    gsap.to(el, {
      y: 0,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(el.querySelector(".card__icon-wrap"), {
      duration: 0.35,
      ease: "power2.out",
    });
  };

  return (
    <section ref={sectionRef} id="services" className="relative py-20 md:py-28">
      <div className="blob blob-1 -left-30 h-80 w-80 bg-[var(--color-primary)] opacity-40" />
      <div className="blob blob-2 left-auto -right-1 top-auto -bottom-80 leading-0 h-110 w-110 bg-[var(--color-secondary)] opacity-5" />
      <div className="container mx-auto px-6">
        <div className="mb-14">
          <p className="eyebrow  mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
            Services
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold">
            What I do{" "}
            <em className="text-[var(--color-text-muted)] not-italic">best</em>.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, index) => (
            <div
              key={s.title}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseEnter={(e) => handleEnter(e.currentTarget)}
              onMouseLeave={(e) => handleLeave(e.currentTarget)}
              className="
                rounded-2xl
                border
                backdrop-blur-sm
                p-7
                hover:border-[var(--color-text-muted)]
                border-[var(--color-border)]
                cursor-default
                transition-colors
              "
            >
              <div
                className="
                  card__icon-wrap
                  w-12 h-12
                  flex items-center justify-center
                  rounded-xl
                  mb-5
                  bg-[var(--color-code-bg)]
                  transition-colors
                "
              >
                <i className={`${s.icon} text-xl`} />
              </div>

              <h3 className="text-lg font-semibold  mb-2">{s.title}</h3>
              <p className="text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Service;
