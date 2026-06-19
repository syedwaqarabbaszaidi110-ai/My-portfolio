import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, FileDown } from "lucide-react";
import logo from "../assets/logo.png";

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { y: 16, opacity: 0, duration: 0.6 })
        .from(".hero-line", { y: 30, opacity: 0, duration: 0.8, stagger: 0.12 }, "-=0.3")
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".hero-cta", { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
        .from(".hero-mark", { scale: 0.85, opacity: 0, duration: 0.9, ease: "back.out(1.6)" }, "-=0.9");

      gsap.to(".blob-1", {
        x: 40, y: -30, duration: 8, ease: "sine.inOut", yoyo: true, repeat: -1,
      });
      gsap.to(".blob-2", {
        x: -30, y: 30, duration: 10, ease: "sine.inOut", yoyo: true, repeat: -1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex min-h-[92vh] items-center overflow-hidden px-6"
    >
      <div className="blob blob-1 h-72 w-72 bg-[var(--color-primary)]" style={{ top: "10%", left: "8%" }} />
      <div className="blob blob-2 h-80 w-80 bg-[var(--color-secondary)]" style={{ bottom: "5%", right: "10%" }} />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="hero-eyebrow eyebrow mb-6">Frontend Developer</p>

          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            <span className="hero-line block text-[var(--color-text)]">Hi, I'm Waqar —</span>
            <span className="hero-line gradient-text block">I build interfaces</span>
            <span className="hero-line block text-[var(--color-text)]">that feel alive.</span>
          </h1>

          <p className="hero-sub mt-7 max-w-md text-lg text-[var(--color-text-muted)]">
            React developer focused on fast, accessible products with thoughtful
            motion and clean component design.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#projects" className="hero-cta btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}>
              View Projects <ArrowRight size={18} />
            </a>
            <a href="/resume.pdf" className="hero-cta btn-ghost" download>
              Resume <FileDown size={18} />
            </a>
          </div>
        </div>

        <div className="hero-mark relative mx-auto hidden md:block">
          <div className="relative flex h-72 w-72 items-center justify-center rounded-[var(--radius-lg)]" style={{ boxShadow: "var(--shadow-glow)" }}>
            <img src={logo} alt="" className="h-44 w-auto drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
