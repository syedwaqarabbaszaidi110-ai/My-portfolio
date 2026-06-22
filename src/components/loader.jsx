import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader({ onFinish, name = "" }) {
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const lineRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const counterObj = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        if (onFinish) onFinish();
      },
    });

    // Letters of the name reveal one by one
    tl.fromTo(
      nameRef.current.querySelectorAll(".letter"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power3.out" },
    );

    // Progress bar fill + counter, running alongside the reveal
    tl.to(
      counterObj,
      {
        val: 100,
        duration: 1.6,
        ease: "power1.inOut",
        onUpdate: () => setProgress(Math.floor(counterObj.val)),
      },
      "<0.2",
    );

    tl.to(
      lineRef.current,
      { scaleX: 1, duration: 1.6, ease: "power1.inOut" },
      "<",
    );

    // Tiny hold once it hits 100%
    tl.to({}, { duration: 0.25 });

    // Curtain exit: panels slide apart to the sides
    tl.to(leftPanelRef.current, {
      xPercent: -100,
      duration: 0.9,
      ease: "power4.inOut",
    });
    tl.to(
      rightPanelRef.current,
      { xPercent: 100, duration: 0.9, ease: "power4.inOut" },
      "<",
    );
    tl.to(containerRef.current, { autoAlpha: 0, duration: 0.3 }, "-=0.1");
    tl.fromTo(
      nameRef.current.querySelectorAll(".letter"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.out",
      },
    );

    return () => tl.kill();
  }, [onFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] flex items-center justify-center"
    >
      {/* Side panels */}
      <div
        ref={leftPanelRef}
        className="absolute inset-y-0 left-0 w-1/2 bg-[var(--color-bg)]"
      />
      <div
        ref={rightPanelRef}
        className="absolute inset-y-0 right-0 w-1/2 bg-[var(--color-bg)]"
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-[var(--color-border)]"></div>

          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--color-primary)] animate-spin"></div>
        </div>

        {/* Progress */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-sm tracking-widest text-[var(--color-text-muted)]">
            Loading...
          </span>

          <span className="font-mono text-xs tracking-widest text-[var(--color-text-muted)]">
            {progress.toString().padStart(3, "0")}%
          </span>
        </div>
      </div>
    </div>
  );
}
