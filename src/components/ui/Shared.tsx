import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5, delay: reduced ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
export function Heading({
  number,
  label,
  title,
  copy,
}: {
  number: string;
  label: string;
  title: string;
  copy?: string;
}) {
  return (
    <Reveal className="section-heading">
      <p className="eyebrow">
        <span>{number} /</span> {label}
      </p>
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </Reveal>
  );
}
export function External({
  href,
  children,
  className = "",
  label,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={label}
    >
      {children}
    </a>
  );
}
export function CopyButton({
  value,
  className = "",
  children,
}: {
  value: string;
  className?: string;
  children?: ReactNode;
}) {
  const [message, setMessage] = useState("");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setMessage("Copied!");
    } catch {
      setMessage(`Copy manually: ${value}`);
    }
  };
  return (
    <div className="copy-wrap">
      <button className={className} onClick={copy}>
        {children || value}
        <Icon name="copy" size={16} />
      </button>
      <span className="copy-feedback" role="status">
        {message}
      </span>
    </div>
  );
}
