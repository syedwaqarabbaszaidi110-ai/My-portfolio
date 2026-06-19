import logo from "../assets/logo.png";


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
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-14 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-9 w-auto" />
            <span className="font-display text-xl font-bold text-[var(--color-text)]">
              Waqar
            </span>
          </a>
          <p className="max-w-xs text-center text-sm text-[var(--color-text-muted)] md:text-left">
            Building clean, fast interfaces — one component at a time.
          </p>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-[var(--color-text-muted)] transition-colors duration-300 hover:text-[var(--color-primary)]"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

      
      </div>

      <div className="border-t border-[var(--color-border)] py-5 text-center text-xs text-[var(--color-text-muted)]">
        © {new Date().getFullYear()} Waqar. All rights reserved.
      </div>
    </footer>
  );
}
