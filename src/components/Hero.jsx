import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, FileDown } from "lucide-react";
import emailjs from "@emailjs/browser";
import cv from "../../public/assets/cv.pdf";

// 1) Sign up free at https://www.emailjs.com
// 2) Create an Email Service + Email Template (template should use {{message}} variable)
// 3) Paste your IDs below
const EMAILJS_SERVICE_ID = "service_zce854n";
const EMAILJS_TEMPLATE_ID = "template_sf7xw6c";
const EMAILJS_PUBLIC_KEY = "_04W05urr7LAwVrw4";

export default function Hero() {
  const handleResumeDownload = () => {
    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: "syedwaqarabbaszaidi110@gmail.com",
          message: "Someone just downloaded your CV from the portfolio.",
        },
        EMAILJS_PUBLIC_KEY
      )
      .catch((err) => console.log("Notification failed", err));
  };

  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        filter: "blur(6px)",
      })
        .from(
          ".hero-line",
          {
            y: 40,
            opacity: 0,
            duration: 0.9,
            stagger: 0.15,
            filter: "blur(10px)",
          },
          "-=0.3",
        )
        .from(
          ".hero-sub",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
            filter: "blur(6px)",
          },
          "-=0.4",
        )
        .from(
          ".hero-cta",
          {
            scale: 0.9,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.3",
        )
        .from(
          ".hero-mark",
          {
            scale: 0.8,
            opacity: 0,
            rotate: -6,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=0.8",
        );

      // floating blobs upgraded
      gsap.to(".blob-1", {
        x: 60,
        y: -40,
        duration: 10,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".blob-2", {
        x: -50,
        y: 50,
        duration: 12,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // subtle floating glow pulse
      gsap.to(".hero-mark", {
        boxShadow: "0 0 80px rgba(124,58,237,0.25)",
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex min-h-[95vh] items-center overflow-hidden px-6"
    >
      {/* Floating Blobs */}
      <div className="blob blob-1 h-80 w-80 bg-[var(--color-primary)] opacity-40" />
      <div className="blob blob-2 h-96 w-96 bg-[var(--color-secondary)] opacity-30" />

      {/* Tiny particles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/4 top-1/3 h-2 w-2 rounded-full bg-white animate-ping" />
        <div className="absolute right-1/3 top-1/2 h-1 w-1 rounded-full bg-white animate-pulse" />
        <div className="absolute bottom-1/3 left-1/2 h-1.5 w-1.5 rounded-full bg-white animate-ping" />
      </div>

      {/* Wider Container */}
      <div className="relative z-10 mx-auto  container items-center gap-20 md:grid-cols-[1.3fr_1fr]">
        {/* LEFT CONTENT */}
        <div className="max-w-5xl">
          <p className="hero-eyebrow mb-6 text-sm tracking-[0.3em] text-[var(--color-text-muted)] uppercase">
            Website Developer
          </p>

          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            <span className="hero-line block text-[var(--color-text)]">
              Hi, I'm  Waqar Abbas —
            </span>
            <span className="hero-line block bg-gradient-to-r from-indigo-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              I build high-converting websites
            </span>
            <span className="hero-line block text-[var(--color-text)]">
              for modern businesses.
            </span>
          </h1>

          <p className="hero-sub mt-7 max-w-lg text-lg leading-relaxed text-[var(--color-text-muted)]">
            I design and develop Shopify stores, WordPress websites, Wix &
            Framer landing pages, GoHighLevel funnels, Elementor builds, and
            modern React applications with clean UI and smooth animations.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <a
              href="#projects"
              className="hero-cta btn-primary group flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Projects
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href={cv}
              download="Syed-Waqar-Abbas-CV.pdf"
              onClick={handleResumeDownload}
              className="hero-cta btn-ghost flex items-center gap-2"
            >
              Resume
              <FileDown size={18} />
            </a>
          </div>
        </div>


      </div>
    </section>
  );
}