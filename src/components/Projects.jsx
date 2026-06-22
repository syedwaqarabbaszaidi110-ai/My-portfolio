import { useEffect, useRef, useState, useCallback } from "react";
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
    image: "src/assets/project/shopify/s1.webp",
  },
  {
    id: 2,
    platform: "Shopify",
    image: "src/assets/project/shopify/s2.webp",
  },
  {
    id: 3,
    platform: "Shopify",
    image: "src/assets/project/shopify/s3.webp",
  },
  {
    id: 4,
    platform: "Shopify",
    image: "src/assets/project/shopify/s4.webp",
  },
  {
    id: 5,
    platform: "Shopify",
    image: "src/assets/project/shopify/s5.webp",
  },
  {
    id: 6,
    platform: "Shopify",
    image: "src/assets/project/shopify/s6.webp",
  },
  {
    id: 7,
    platform: "Shopify",
    image: "src/assets/project/shopify/s7.webp",
  },
  {
    id: 8,
    platform: "Shopify",
    image: "src/assets/project/shopify/s8.webp",
  },

  // Elementor
  {
    id: 9,
    platform: "Elementor",
    image: "src/assets/project/elementor/e1.webp",
  },
  {
    id: 10,
    platform: "Elementor",
    image: "src/assets/project/elementor/e4.jpg",
  },
  {
    id: 11,
    platform: "Elementor",
    image: "src/assets/project/elementor/e3.webp",
  },
  {
    id: 12,
    platform: "Elementor",
    image: "src/assets/project/elementor/e2.webp",
  },

  // GHL
  {
    id: 13,
    platform: "GHL",
    image: "src/assets/project/ghl/ghl.png",
  },

  // Wix
  {
    id: 14,
    platform: "Wix",
    image: "src/assets/project/wix/wix1.webp",
  },
  {
    id: 15,
    platform: "Wix",
    image: "src/assets/project/wix/wix2.webp",
  },
  {
    id: 16,
    platform: "Wix",
    image: "src/assets/project/wix/wix3.webp",
  },
  {
    id: 17,
    platform: "Wix",
    image: "src/assets/project/wix/wix4.webp",
  },

  // Custom WordPress
  {
    id: 18,
    platform: "Custom WordPress",
    image: "src/assets/project/custom worpress/w1.png",
  },
];

/* ---------------- Lightbox Component ---------------- */
function Lightbox({ project, onClose }) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragRef = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
  });
  const imgWrapRef = useRef(null);

  const MIN_SCALE = 1;
  const MAX_SCALE = 4;

  // Reset zoom/pan whenever a new project opens
  useEffect(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }, [project]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const zoomIn = useCallback(() => {
    setScale((s) => Math.min(MAX_SCALE, +(s + 0.5).toFixed(2)));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((s) => {
      const next = Math.max(MIN_SCALE, +(s - 0.5).toFixed(2));
      if (next === MIN_SCALE) setPos({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }, []);

  // Keyboard controls: Esc to close, +/- to zoom
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-" || e.key === "_") zoomOut();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, zoomIn, zoomOut]);

  // Double click to toggle zoom
  const handleDoubleClick = () => {
    setScale((s) => (s === 1 ? 2 : 1));
    if (scale !== 1) setPos({ x: 0, y: 0 });
  };

  // Scroll wheel to zoom
  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  };

  // Drag to pan when zoomed in
  const handleMouseDown = (e) => {
    if (scale === 1) return;
    dragRef.current.dragging = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.startY = e.clientY;
    dragRef.current.origX = pos.x;
    dragRef.current.origY = pos.y;
  };

  const handleMouseMove = (e) => {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPos({
      x: dragRef.current.origX + dx,
      y: dragRef.current.origY + dy,
    });
  };

  const stopDrag = () => {
    dragRef.current.dragging = false;
  };

  // Animate in
  useEffect(() => {
    gsap.fromTo(
      ".lightbox-backdrop",
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" },
    );
    gsap.fromTo(
      ".lightbox-content",
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" },
    );
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="lightbox-backdrop fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={handleBackdropClick}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      {/* Top bar */}
      <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between p-5">
        <span className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-medium text-white backdrop-blur-xl">
          {project.platform}
        </span>

        <button
          onClick={onClose}
          aria-label="Close"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-xl transition-colors hover:bg-white/20"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Image area */}
      <div
        ref={imgWrapRef}
        className="lightbox-content relative flex h-full w-full items-center justify-center overflow-hidden px-4 py-20"
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={project.image}
          alt={project.platform}
          draggable={false}
          onMouseDown={handleMouseDown}
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
            cursor: scale === 1 ? "zoom-in" : "grab",
            transition: dragRef.current.dragging
              ? "none"
              : "transform 0.2s ease-out",
          }}
          className="max-h-full max-w-full select-none rounded-xl object-contain shadow-2xl"
        />
      </div>

      {/* Zoom controls */}
      <div
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3 py-2 backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={zoomOut}
          disabled={scale <= MIN_SCALE}
          aria-label="Zoom out"
          className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 disabled:opacity-30"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3M8 11h6" strokeLinecap="round" />
          </svg>
        </button>

        <button
          onClick={resetZoom}
          className="min-w-[52px] rounded-full px-2 py-1 text-center text-xs font-medium text-white/80 transition-colors hover:bg-white/15 hover:text-white"
        >
          {Math.round(scale * 100)}%
        </button>

        <button
          onClick={zoomIn}
          disabled={scale >= MAX_SCALE}
          aria-label="Zoom in"
          className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 disabled:opacity-30"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ---------------- Projects Component ---------------- */
export default function Projects() {
  const root = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

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
    <section id="projects" ref={root} className="relative overflow-hidden py-12 md:py-24 lg:py-32">
      {" "}
      <SectionDivider  className="mt-10"/>
      {/* Background Glow */}
      <div className="absolute left-1/2 top-32 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--color-primary)]/10 blur-[140px]" />
      <div className="relative mx-auto mt-16 container px-4 ">
        <p className="eyebrow mb-5">Projects</p>

        <h2 className="font-display text-4xl font-bold md:text-6xl">
          Selected Work
        </h2>

        <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
          A collection of websites, funnels, stores and digital experiences
          crafted with performance, aesthetics and usability in mind.
        </p>

        {/* Filters */}
        <div className="mt-4 sm:mt-6 md:mt-8  flex flex-wrap gap-3">
          {PLATFORMS.map((platform) => (
            <button
              key={platform}
              onClick={() => setActiveFilter(platform)}
              className={`rounded-full border px-3 sm:px-4 md:px-5 py-2 text-xs sm:text-sm transition-all duration-300
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
        <div className="mt-8 sm:mt-10 md:mt-12  lg:mt-14 grid gap-3 lg:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setSelectedProject(project)}
              className="project-card group relative h-[400px] sm:h-[500px] md:h-[600px] cursor-pointer overflow-hidden rounded-[30px] border border-white/10 bg-black"
            >
              {/* Glow */}
              <div className="card-glow absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[90px]" />

              {/* Image */}
              <img
                src={project.image}
                alt={project.platform}
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-1000 ease-in-out group-hover:translate-y-8"
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
      {/* Lightbox */}
      {selectedProject && (
        <Lightbox
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
