import logo from "../assets/logo.png";
import {
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      {/* Background Glow */}{" "}
      <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
        {/* Top Section */}
        <div className="grid gap-10 sm:gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span
                className="relative p-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/5 ring-1 ring-[var(--color-primary)]/30"
              >
                <img src={logo} alt="Logo" className="h-4 w-auto" />
              </span>

              <h3 className="font-display text-xl font-bold sm:text-2xl">Waqar</h3>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-[var(--color-text-muted)]">
              Building modern web experiences with clean code, smooth animations
              and pixel-perfect design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold uppercase tracking-wider sm:text-xl">
              Quick Links
            </h4>

            <ul className="space-y-3 mt-4 sm:mt-5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)] sm:text-md"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold uppercase tracking-wider sm:text-xl">
              Let's Connect
            </h4>

            <p className="my-4 text-sm text-[var(--color-text-muted)] sm:my-5">
              Have a project in mind? Let's create something amazing together.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href="mailto:syedwaqarabbaszaidi110@gmail.com"
                className="rounded-full border flex gap-3 items-center justify-center border-[var(--color-border)] p-3 text-sm transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] sm:gap-6"
              >
                <FaEnvelope className="flex-shrink-0" />
                <label className="break-all sm:break-normal">syedwaqarabbaszaidi110@gmail.com</label>
              </a>
              <a
                href="tel:+923708970508"
                className="rounded-full border flex gap-3 items-center justify-center border-[var(--color-border)] p-3 text-sm transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] sm:gap-6"
              >
                <FaPhone size={16} className="rotate-95 flex-shrink-0" />
                <label>+92 370 8970508</label>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-[var(--color-border)] sm:my-10" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-3 text-center text-xs text-[var(--color-text-muted)] sm:text-sm md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} Waqar. All rights reserved.</p>

          <p>Made with using React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}