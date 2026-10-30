import {
  ArrowUpRight,
  Blocks,
  Bot,
  Camera,
  Code2,
  Coffee,
  Copy,
  Crosshair,
  Gamepad2,
  Globe,
  Heart,
  Laptop,
  Link,
  MapPin,
  Menu,
  MessageCircle,
  Monitor,
  Mountain,
  Network,
  Server,
  Shield,
  Sparkles,
  Terminal,
  Users,
  Wallet,
  Wrench,
  X,
} from "lucide-react";
const icons = {
  arrow: ArrowUpRight,
  blocks: Blocks,
  bot: Bot,
  camera: Camera,
  code: Code2,
  coffee: Coffee,
  copy: Copy,
  crosshair: Crosshair,
  gamepad: Gamepad2,
  globe: Globe,
  heart: Heart,
  laptop: Laptop,
  link: Link,
  location: MapPin,
  menu: Menu,
  discord: MessageCircle,
  desktop: Monitor,
  mountain: Mountain,
  network: Network,
  server: Server,
  shield: Shield,
  sparkles: Sparkles,
  terminal: Terminal,
  users: Users,
  wallet: Wallet,
  wrench: Wrench,
  x: X,
};
export function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  if (name === "github")
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={className}
      >
        <path d="M12 .7A11.5 11.5 0 0 0 8.36 23.1c.58.11.79-.25.79-.55v-2.14c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.3 1.18-3.1-.12-.29-.51-1.47.11-3.07 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.6.24 2.78.12 3.07.73.8 1.18 1.84 1.18 3.1 0 4.42-2.7 5.4-5.26 5.68.42.36.78 1.06.78 2.14v3.15c0 .3.21.67.8.55A11.5 11.5 0 0 0 12 .7Z" />
      </svg>
    );
  if (name === "youtube")
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
        className={className}
      >
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" />
      </svg>
    );
  if (name === "roblox")
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={className}
      >
        <path
          fillRule="evenodd"
          d="M5 1 23 6 18 24 0 19Zm4.3 7.2-1.6 6 6 1.6 1.6-6Z"
        />
      </svg>
    );
  if (name === "tiktok")
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
        className={className}
      >
        <path d="M14 3v12a5 5 0 1 1-5-5m5-7c0 4 3 6 6 6" />
      </svg>
    );
  if (name === "snapchat")
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
        className={className}
      >
        <path d="M7 10V8a5 5 0 0 1 10 0v2l3 1-3 2c0 3 3 4 3 4l-4 1-1 2-3-1-3 1-1-2-4-1s3-1 3-4l-3-2Z" />
      </svg>
    );
  const Component = icons[name as keyof typeof icons] || Globe;
  return (
    <Component
      size={size}
      className={className}
      aria-hidden="true"
      strokeWidth={1.7}
    />
  );
}
