import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionDivider from "./SectionDivider";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "3+", label: "Years building" },
  { value: "20+", label: "Projects shipped" },
  { value: "10+", label: "Happy clients" },
];

const skills = [
  "React", "JavaScript", "Tailwind CSS", "GSAP", "Node.js", "Git", "Figma", "REST APIs",
];

export default function About() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="relative px-6 py-28">
      <SectionDivider />

      <div className="mx-auto mt-16 grid max-w-7xl gap-16 md:grid-cols-2">
        <div>
          <p className="about-reveal eyebrow mb-5">About</p>
          <h2 className="about-reveal font-display text-3xl font-bold md:text-4xl">
            Code that's clean, fast, and a little bit alive.
          </h2>
          <p className="about-reveal mt-6 text-[var(--color-text-muted)]">
            I'm a frontend developer who likes turning ideas into interfaces
            people enjoy using. I care about performance, accessibility, and
            the small motion details that make a product feel polished
            rather than just functional.
          </p>

          <div className="about-reveal mt-8 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text-muted)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="about-reveal grid grid-cols-3 gap-4 self-start">
          {stats.map((stat) => (
            <div key={stat.label} className="card flex flex-col items-center gap-2 px-4 py-8 text-center">
              <span className="font-display gradient-text text-3xl font-bold">{stat.value}</span>
              <span className="text-xs text-[var(--color-text-muted)]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
