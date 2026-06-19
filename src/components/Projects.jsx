import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionDivider from "./SectionDivider";

gsap.registerPlugin(ScrollTrigger);

// Replace with your real projects
const projects = [
  {
    title: "Project One",
    description: "A short, honest sentence about what this project does and the problem it solves.",
    tags: ["React", "Tailwind"],
    liveHref: "#",
    codeHref: "#",
  },
  {
    title: "Project Two",
    description: "A short, honest sentence about what this project does and the problem it solves.",
    tags: ["Node.js", "MongoDB"],
    liveHref: "#",
    codeHref: "#",
  },
  {
    title: "Project Three",
    description: "A short, honest sentence about what this project does and the problem it solves.",
    tags: ["Next.js", "GSAP"],
    liveHref: "#",
    codeHref: "#",
  },
];

export default function Projects() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={root} className="relative px-6 py-28">
      <SectionDivider />

      <div className="mx-auto mt-16 max-w-7xl">
        <p className="eyebrow mb-5">Projects</p>
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          A few things I've built.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <div key={project.title} className="project-card card flex flex-col p-6">
              <h3 className="font-display text-xl font-semibold">{project.title}</h3>
              <p className="mt-3 flex-1 text-sm text-[var(--color-text-muted)]">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="font-mono rounded-md bg-[var(--color-code-bg)] px-2 py-1 text-xs text-[var(--color-text-muted)]">
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
