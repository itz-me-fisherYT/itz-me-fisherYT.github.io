import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { sections } from "../../data/profile";
import { Icon } from "../ui/Icon";
export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="header">
      <div className="nav-shell">
        <a
          href="#home"
          className="brand"
          onClick={() => setOpen(false)}
          aria-label="ItzRealFisher home"
        >
          <span className="brand-mark">
            f<span>.</span>
          </span>
          <span>
            ItzRealFisher<span className="brand-dot">.</span>
          </span>
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="navigation"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "x" : "menu"} />
        </button>
        <nav
          id="navigation"
          className={open ? "nav-links is-open" : "nav-links"}
          aria-label="Main navigation"
        >
          {sections.map((section) => {
            const id = section.toLowerCase();
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                onClick={() => setOpen(false)}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="nav-indicator"
                    transition={{ duration: 0.2 }}
                  />
                )}
                <span>{section}</span>
              </a>
            );
          })}
        </nav>
        <a className="nav-connect" href="#contact">
          Let’s talk <Icon name="arrow" size={16} />
        </a>
      </div>
    </header>
  );
}
