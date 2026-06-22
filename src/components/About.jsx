import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Sparkles, Users } from "lucide-react";
import SectionDivider from "./SectionDivider";
import aboutImage from "../assets/about-waqar.png";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "3+", label: "Years building", icon: Code2 },
  { value: "20+", label: "Projects shipped", icon: Sparkles },
  { value: "10+", label: "Happy clients", icon: Users },
];

const skills = [
  "React",
  "JavaScript",
  "Tailwind CSS",
  "GSAP",
  "Git",
  "Figma",
  "Wordpress",
  "Wix",
  "GHL",
  "Elementor",
  "Bootstrap",
  "Silk slider",
  "Swiper Slider",
  "Responsive",
  "CSS 3",
  "Shopify",
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

      gsap.from(".stat-card", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".stat-card", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="relative">
      <SectionDivider />

      <div className="mx-auto mt-16 container grid items-center gap-6 md:gap-14 lg:gap-16 md:grid-cols-2 px-4 pt-12 md:pt-20 lg:pt-28">
        <div className="">
          <p className="about-reveal eyebrow mb-5">About Me </p>
          <h2 className="about-reveal font-display text-3xl font-bold leading-tight md:text-4xl">
            Code that's clean, fast, and a little bit{" "}
            <span className="gradient-text">alive.</span>
          </h2>
          <p className="about-reveal mt-6 leading-relaxed text-[var(--color-text-muted)]">
            I'm a frontend developer who likes turning ideas into interfaces
            people enjoy using. I care about performance, accessibility, and the
            small motion details that make a product feel polished rather than
            just functional.
          </p>
          <p className="about-reveal mt-4 leading-relaxed text-[var(--color-text-muted)]">
            Whether it's a marketing site, a dashboard, or a custom store build,
            my goal is the same — ship something fast, clean, and easy for the
            client to actually use.
          </p>

          <div className="about-reveal mt-8 mb-2 sm:mb-10 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-text-muted)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="about-reveal flex items-center justify-center">
          <div className="relative flex -mb-6 justify-center">
            <div className="absolute h-full w-full rounded-full bg-[var(--color-secondary)] opacity-30 blur-[100px]" />

            <img
              src={aboutImage}
              alt="Developer portrait"
              className="relative z-10 h-full w-full  object-cover drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:-translate-y-2"
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto flex items-center justify-center px-4">
        <div className="about-reveal grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-7xl  flex-col gap-4 self-start justify-center">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-card card flex items-center gap-5 px-6 py-6"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--color-code-bg)]">
                <stat.icon
                  size={22}
                  className="text-[var(--color-text-muted)]"
                />
              </div>
              <div>
                <span className="font-display gradient-text block text-2xl font-bold leading-none">
                  {stat.value}
                </span>
                <span className="mt-1 block text-sm text-[var(--color-text-muted)]">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
