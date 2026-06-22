import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionDivider from "./SectionDivider";

gsap.registerPlugin(ScrollTrigger);

const PLATFORMS = [
  "All",
  "Shopify",
  "Elementor",
  "GHL",
  "Wix",
  "Custom WordPress",
];

const projects = [
  // Shopify
  {
    id: 1,
    platform: "Shopify",
    image: "public/assets/project/shopify/s1.png",
  },
  {
    id: 2,
    platform: "Shopify",
    image: "public/assets/project/shopify/s2.png",
  },
  {
    id: 3,
    platform: "Shopify",
    image:"public/assets/project/shopify/s3.png" ,
  },
  {
    id: 4,
    platform: "Shopify",
    image: "public/assets/project/shopify/s4.png",
  },
  {
    id: 5,
    platform: "Shopify",
    image:"public/assets/project/shopify/s5.jpg" ,
  },
  {
    id: 6,
    platform: "Shopify",
    image: "public/assets/project/shopify/s6.jpg",
  },
  {
    id: 7,
    platform: "Shopify",
    image: "public/assets/project/shopify/s7.png",
  },
  {
    id: 8,
    platform: "Shopify",
    image:"public/assets/project/shopify/s8.png" ,
  },

  // Elementor
  {
    id: 9,
    platform: "Elementor",
    image: "public/assets/project/elementor/e1.png",
  },
  {
    id: 10,
    platform: "Elementor",
    image: "public/assets/project/elementor/e4.jpg",
  },
  {
    id: 11,
    platform: "Elementor",
    image: "public/assets/project/elementor/e3.png",
  },
  {
    id: 12,
    platform: "Elementor",
    image: "public/assets/project/elementor/e2.png",
  },

  // GHL
  {
    id: 13,
    platform: "GHL",
    image: "public/assets/project/ghl/ghl.png",
  },

  // Wix
  {
    id: 14,
    platform: "Wix",
    image: "public/assets/project/wix/wix1.png",
  },
  {
    id: 15,
    platform: "Wix",
    image: "public/assets/project/wix/wix2.png",
  },
  {
    id: 16,
    platform: "Wix",
    image: "public/assets/project/wix/wix3.png",
  },
  {
    id: 17,
    platform: "Wix",
    image: "public/assets/project/wix/wix4.png",
  },

  // Custom WordPress
  {
    id: 18,
    platform: "Custom WordPress",
    image: "public/assets/project/custom worpress/w1.png",
  },
];

export default function Projects() {
  const root = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.platform === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        opacity: 0,
        y: 80,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, [activeFilter]);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 12;
    const rotateX = (y / rect.height - 0.5) * -12;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.35,
      ease: "power2.out",
    });

    const glow = card.querySelector(".card-glow");

    gsap.to(glow, {
      x: x - rect.width / 2,
      y: y - rect.height / 2,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.to(card.querySelector(".card-glow"), {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  return (
    <section
      id="projects"
      ref={root}
      className="relative overflow-hidden px-6 py-32"
    >
      {" "}
      <SectionDivider />
      {/* Background Glow */}
      <div className="absolute left-1/2 top-32 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--color-primary)]/10 blur-[140px]" />
      <div className="relative mx-auto mt-16 max-w-7xl">
        <p className="eyebrow mb-5">Projects</p>

        <h2 className="font-display text-4xl font-bold md:text-6xl">
          Selected Work
        </h2>

        <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
          A collection of websites, funnels, stores and digital experiences
          crafted with performance, aesthetics and usability in mind.
        </p>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap gap-3">
          {PLATFORMS.map((platform) => (
            <button
              key={platform}
              onClick={() => setActiveFilter(platform)}
              className={`rounded-full border px-5 py-2 text-sm transition-all duration-300 ${
                activeFilter === platform
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-text)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)]"
              }`}
            >
              {platform}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="project-card group relative h-[600px] overflow-hidden rounded-[30px] border border-white/10 bg-black"
            >
              {/* Glow */}
              <div className="card-glow absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[90px]" />

              {/* Image */}
              <img
                src={project.image}
                alt={project.platform}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Platform Tag */}
              <div className="absolute left-5 top-5 z-20">
                <span className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-medium text-white backdrop-blur-xl">
                  {project.platform}
                </span>
              </div>

              {/* Bottom Hover Content */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                <div className="translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="mb-3 h-px w-full bg-white/20" />

                  <p className="text-sm text-white/70">View Project</p>
                </div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div className="absolute -left-32 top-0 h-full w-24 rotate-12 bg-white/10 blur-2xl transition-all duration-1000 group-hover:left-[120%]" />
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-[var(--color-text-muted)]">
              No projects found for this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
