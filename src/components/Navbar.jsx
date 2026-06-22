import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import gsap from "gsap";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo.png";


const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const WHATSAPP_NUMBER = "923708970508";
const WHATSAPP_MESSAGE =
  "Hi Waqar! I came across your portfolio and would like to talk about a project.";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const ctaRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Glassy + shrink effect on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Entrance animation on first mount
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
      .fromTo(
        logoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        linksRef.current,
        { opacity: 0, y: -14 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
        "-=0.3"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.5 },
        "-=0.3"
      );

    return () => tl.kill();
  }, []);

  // Mobile menu open animation
  useEffect(() => {
    if (!isOpen || !mobileMenuRef.current) return;
    gsap.fromTo(
      mobileMenuRef.current,
      { height: 0, opacity: 0 },
      { height: "auto", opacity: 1, duration: 0.45, ease: "power2.out" }
    );
    gsap.fromTo(
      mobileMenuRef.current.querySelectorAll("li, .mobile-cta"),
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, delay: 0.1 }
    );
  }, [isOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      WHATSAPP_MESSAGE
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleLinkHover = (i, entering) => {
    const underline = linksRef.current[i]?.querySelector(".nav-underline");
    if (!underline) return;
    gsap.to(underline, {
      scaleX: entering ? 1 : 0,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleLogoHover = (entering) => {
    gsap.to(logoRef.current, {
      rotate: entering ? -6 : 0,
      scale: entering ? 1.06 : 1,
      duration: 0.4,
      ease: "back.out(2)",
    });
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "border-[var(--color-border)] bg-[var(--color-bg)]/90 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          : "border-transparent bg-[var(--color-bg)]/60 backdrop-blur-md"
      }`}
    >
      <nav
        className={`mx-auto flex container items-center justify-between  transition-all duration-500 ${
          scrolled ? "h-20" : "h-30"
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-2.5"
        >
          <span
            ref={logoRef}
            onMouseEnter={() => handleLogoHover(true)}
            onMouseLeave={() => handleLogoHover(false)}
            className="relative p-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/5 ring-1 ring-[var(--color-primary)]/30"
          >
            <img src={logo} alt="Logo" className="h-4 w-auto" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-[var(--color-text)]">
            Waqar<span className="text-[var(--color-primary)]">.</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link, i) => (
            <li
              key={link.name}
              ref={(el) => (linksRef.current[i] = el)}
              onMouseEnter={() => handleLinkHover(i, true)}
              onMouseLeave={() => handleLinkHover(i, false)}
              className="relative"
            >
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-md font-medium text-[var(--color-text-muted)] transition-colors duration-300 hover:text-[var(--color-text)]"
              >
                {link.name}
              </a>
              <span className="nav-underline absolute -bottom-1.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-[var(--color-primary)]" />
            </li>
          ))}
        </ul>

        {/* Desktop right side */}
        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <button
            ref={ctaRef}
            onClick={handleWhatsAppClick}
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-[var(--color-text)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg)] shadow-[0_8px_20px_-6px_var(--color-primary)] transition-transform duration-800 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-6px_var(--color-primary)]"
          >
            <MessageCircle size={16} className="relative z-10" />
            <span className="relative z-10">Contact Us</span>
            <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-0" />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          className="text-[var(--color-text)] md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-surface)] md:hidden"
        >
          <ul className="flex flex-col gap-6 p-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <button
              onClick={handleWhatsAppClick}
              className="mobile-cta flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-bg)]"
            >
              <MessageCircle size={16} />
              Contact Us
            </button>
            <div className="mobile-cta flex justify-center">
              <ThemeToggle />
            </div>
          </ul>
        </div>
      )}
    </header>
  );
}