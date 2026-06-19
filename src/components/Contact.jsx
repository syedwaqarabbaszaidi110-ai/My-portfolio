import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionDivider from "./SectionDivider";
import { Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);


export default function Contact() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={root} className="relative px-6 py-28">
      <SectionDivider />

      <div className="mx-auto mt-16 max-w-3xl text-center">
        <p className="contact-reveal eyebrow mx-auto mb-5 justify-center">Contact</p>
        <h2 className="contact-reveal font-display text-3xl font-bold md:text-4xl">
          Got an idea? <span className="gradient-text">Let's build it.</span>
        </h2>
        <p className="contact-reveal mt-5 text-[var(--color-text-muted)]">
          I'm currently open to freelance work and new opportunities.
          Reach out and I'll get back to you within a day or two.
        </p>

        <a
          href="mailto:syedwaqarabbaszaidi110@gamil.com"
          className="contact-reveal btn-primary mt-9 inline-flex"
        >
          <Mail size={18} />
        </a>

      </div>
    </section>
  );
}
