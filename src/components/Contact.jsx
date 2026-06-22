import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionDivider from "./SectionDivider";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { IoSend } from "react-icons/io5";


gsap.registerPlugin(ScrollTrigger);

// 👉 Get a free access key from https://web3forms.com (no backend needed)
const WEB3FORMS_ACCESS_KEY = "325a1bb8-e511-4c4d-8c8a-f450fd5da2f6";

const socials = [
  { icon: FaGithub, href: "#", label: "GitHub" },
  {
    icon: FaLinkedin,
    href: "#",
    label: "LinkedIn",
  },
  {
    icon: FaInstagram,
    href: "#",
    label: "Instagram",
  },
  {
    icon: FaTwitter,
    href: "#",
    label: "Twitter",
  },
];

export default function Contact() {
  const root = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New message from portfolio site",
          from_name: form.name,
          to_email: "syedwaqarabbaszaidi110@gmail.com",
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm({ name: "", phone: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={root} className="relative px-6 py-28">
      <SectionDivider />

      <div className="mx-auto mt-16 max-w-3xl text-center">
        <p className="contact-reveal eyebrow mx-auto mb-5 justify-center">
          Contact
        </p>
        <h2 className="contact-reveal font-display text-3xl font-bold md:text-4xl">
          Got an idea? <span className="gradient-text">Let's build it.</span>
        </h2>
        <p className="contact-reveal mt-5 text-[var(--color-text-muted)]">
          I'm currently open to freelance work and new opportunities. Fill the
          form below and I'll get back to you within a day or two.
        </p>

        {/* Quick contact info */}
        <div className="contact-reveal mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
          <a
            href="tel:+92XXXXXXXXXX"
            className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          >
            <FaPhone size={16} />
            +92 XXX XXXXXXX
          </a>

          <a
            href="mailto:syedwaqarabbaszaidi110@gmail.com"
            className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          >
            <FaEnvelope size={16} />
            syedwaqarabbaszaidi110@gmail.com
          </a>
        </div>

        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          className="contact-reveal card mt-12 flex flex-col gap-4 p-8 text-left"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-code-bg)] px-4 py-3 text-sm outline-none focus:border-[var(--color-text-muted)]"
            />
            <input
              type="tel"
              name="phone"
              required
              placeholder="Phone number"
              value={form.phone}
              onChange={handleChange}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-code-bg)] px-4 py-3 text-sm outline-none focus:border-[var(--color-text-muted)]"
            />
          </div>

          <input
            type="email"
            name="email"
            required
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-code-bg)] px-4 py-3 text-sm outline-none focus:border-[var(--color-text-muted)]"
          />

          <textarea
            name="message"
            required
            rows={4}
            placeholder="Tell me a bit about your project..."
            value={form.message}
            onChange={handleChange}
            className="resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-code-bg)] px-4 py-3 text-sm outline-none focus:border-[var(--color-text-muted)]"
          />

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <IoSend size={16} />
            {status === "sending" ? "Sending..." : "Send message"}
          </button>

          {status === "success" && (
            <p className="text-sm text-green-500">
              Thanks! Your message has been sent — I'll reply soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-500">
              Something went wrong. Please try again or email me directly.
            </p>
          )}
        </form>

        {/* Social links */}
        <div className="contact-reveal mt-10 flex items-center justify-center gap-5">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
