import logo from "../../public/assets/logo.png";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

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
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        {/* Top Section */}
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img src={logo} alt="Waqar Logo" className="h-15 w-auto" />

              <h3 className="font-display text-2xl font-bold">Waqar</h3>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-[var(--color-text-muted)]">
              Building modern web experiences with clean code, smooth animations
              and pixel-perfect design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-xl font-semibold uppercase tracking-wider">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-md text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)]"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xl font-semibold uppercase tracking-wider">
              Let's Connect
            </h4>

            <p className="mb-5 text-sm text-[var(--color-text-muted)]">
              Have a project in mind? Let's create something amazing together.
            </p>

            <div className="flex gap-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--color-border)] p-3 transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--color-border)] p-3 transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://instagram.com/yourusername"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--color-border)] p-3 transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                <FaInstagram />
              </a>

              <a
                href="mailto:your@email.com"
                className="rounded-full border border-[var(--color-border)] p-3 transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-[var(--color-border)]" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-3 text-sm text-[var(--color-text-muted)] md:flex-row">
          <p>© {new Date().getFullYear()} Waqar. All rights reserved.</p>

          <p>Made with using React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
