import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let gradientIdCounter = 0;

export default function SectionDivider() {
  const pathRef = useRef(null);
  const idRef = useRef(`swooshGradient-${gradientIdCounter++}`);

  useEffect(() => {
    const path = pathRef.current;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: path,
        start: "top 85%",
        once: true,
      },
    });

    return () => tween.kill();
  }, []);

  return (
    <svg
      className="swoosh-divider"
      viewBox="0 0 400 48"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={idRef.current} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-accent-blue)" />
          <stop offset="55%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="var(--color-secondary)" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        d="M0 24 L150 24 L185 40 L230 8 L400 24"
        style={{ stroke: `url(#${idRef.current})` }}
      />
    </svg>
  );
}
