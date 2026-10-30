export type Project = {
  id: string;
  name: string;
  description: string;
  category: string;
  technologies: string[];
  status: string;
  icon: string;
  accent: string;
  featured?: boolean;
  image?: string;
  github?: string;
  url?: string;
  documentation?: string;
  features: string[];
  note?: string;
};
export const projects: Project[] = [
  {
    id: "blockboss",
    name: "BlockBoss",
    category: "Discord Bot",
    description:
      "My custom Discord bot for community management, moderation, automation and gaming integrations.",
    technologies: ["JavaScript", "Node.js", "Discord.js", "APIs"],
    status: "Development project",
    icon: "bot",
    accent: "purple",
    featured: true,
    features: [
      "Slash and prefix commands",
      "Moderation, warnings and punishment cases",
      "Mutes, kicks, bans and purge commands",
      "Channel locks and slowmode controls",
      "Tickets, giveaways, polls and suggestions",
      "XP, levelling and personal coloured roles",
      "Roblox account linking and username availability tools",
      "Roblox profiles and presence information",
      "Staff logging, user and server information",
      "Clip-related commands",
    ],
    note: "Feature scope supplied by the owner. Individual features and production readiness have not been independently verified.",
  },
  {
    id: "canna",
    name: "CannaNetwork",
    category: "Minecraft Network",
    description:
      "An anarchy network bringing together custom plugins, server configuration and community management.",
    technologies: ["Java", "Paper", "Minecraft", "Web Development"],
    status: "Historical project",
    icon: "blocks",
    accent: "green",
    featured: true,
    url: "https://cannanetwork.github.io",
    documentation: "https://cannasmp.tebex.io",
    features: [
      "CannaNetwork / CannaAnarchy",
      "Minecraft Java 1.21.x and duplication-enabled anarchy",
      "Hosting, anti-bot systems and performance troubleshooting",
      "Plugin management and community administration",
      "Website and store integration",
    ],
    note: "Historical domain reference: cannanetwork.dpdns.org. Current server availability is unverified.",
  },
  {
    id: "zenith",
    name: "ZenithSMP",
    category: "Minecraft Server",
    description:
      "A survival multiplayer project with Origins, proximity voice chat and a community-first approach.",
    technologies: ["Minecraft", "Folia", "Origins", "Voice Chat"],
    status: "Status unverified",
    icon: "mountain",
    accent: "blue",
    featured: true,
    features: [
      "Origins and proximity voice chat",
      "Homes and teleport requests",
      "Custom survival and community features",
    ],
    note: "Current availability has not been confirmed.",
  },
  {
    id: "hub",
    name: "Fisher Hub",
    category: "Roblox / Luau",
    description:
      "Roblox interface and scripting experiments with configurable gameplay utilities and automation concepts.",
    technologies: ["Luau", "Roblox UI", "Scripting"],
    status: "Experimental",
    icon: "gamepad",
    accent: "blue",
    features: ["Configurable interfaces", "Scripting and automation concepts"],
    note: "Independent experiments; not endorsed by Roblox.",
  },
  {
    id: "obsidian",
    name: "ObsidianLua Controller",
    category: "Automation",
    description:
      "An experimental remote communication system connecting Roblox interfaces with Cloudflare Workers.",
    technologies: ["Luau", "Cloudflare Workers", "HTTP APIs", "GUI"],
    status: "Experimental",
    icon: "network",
    accent: "purple",
    features: ["Remote communication concepts", "HTTP API and GUI development"],
  },
  {
    id: "control",
    name: "FisherControl",
    category: "Systems",
    description:
      "Experiments in managing personal computers, accessing files and simplifying administration workflows.",
    technologies: ["Windows", "SSH", "Networking", "Automation"],
    status: "Experimental",
    icon: "terminal",
    accent: "blue",
    features: [
      "Personal computer administration",
      "Remote file access and workflow experiments",
    ],
  },
  {
    id: "candy",
    name: "FisherCandy",
    category: "Roblox / Luau",
    description:
      "A Roblox movement and collection experiment exploring target selection, movement logic and iterative testing.",
    technologies: ["Luau", "Movement Logic", "Automation"],
    status: "Experimental",
    icon: "sparkles",
    accent: "pink",
    features: ["Target selection", "Movement logic", "Iterative testing"],
  },
  {
    id: "portfolio",
    name: "ItzFisher Portfolio",
    category: "Web Development",
    description:
      "The place where my projects, communities and online world come together. You’re looking at it.",
    technologies: ["React", "Vite", "TypeScript", "Tailwind CSS", "Motion"],
    status: "This website",
    icon: "code",
    accent: "purple",
    github: "https://github.com/itz-me-fisherYT/itz-me-fisherYT.github.io",
    url: "https://itzfisher.org",
    features: [
      "Accessible, responsive portfolio",
      "Project archive and social hub",
      "Optional public GitHub integration",
    ],
  },
];
export const existingProjects = [
  {
    name: "BlockBase Launcher",
    description:
      "Custom Minecraft Java launcher with profiles, login, modpack imports and release updates.",
    github: "https://github.com/itz-me-fisherYT/BlockBase-Launcher",
  },
  {
    name: "MineCord",
    description: "Minecraft and Discord community tools.",
    github: "https://github.com/itz-me-fisherYT/MineCord",
    image: "/assets/project-minecord.svg",
  },
  {
    name: "Sentra",
    description: "A Discord bot and website workspace.",
    github: "https://github.com/itz-me-fisherYT/Sentra",
    image: "/assets/project-sentra.svg",
  },
  {
    name: "GitHub profile README",
    description: "The source behind my GitHub profile.",
    github: "https://github.com/itz-me-fisherYT/itz-me-fisherYT",
    image: "/assets/project-profile.svg",
  },
  {
    name: "BlockBaseMC website",
    description: "Feature pages, roadmap, credits and launcher downloads.",
    github: "https://github.com/BlockBaseApp/BlockBaseApp.github.io",
  },
];
export const archive = [
  "TicketForge",
  "Help Bot 2.0",
  "Fisher RAM Roblox Account Manager",
  "StatsTools",
  "NovaBridge",
  "BoundPVPChatGames",
  "BoundPVPDiscordBridge",
  "BoundPVPKoth",
  "BoundPVPShardsPAPI",
  "BoundPVPFishingRewards",
  "BoundPVPPunish",
  "Minecraft RTP GUI",
  "Minecraft Sign Tool",
  "Shards Shop",
  "Kit Bot",
];
export const communities = [
  "LifeDupey",
  "PureBliss",
  "BlissGens",
  "BoundPvP",
  "DupeBound",
  "School SMP",
  "PlayFishSMP",
  "DayLightSMP",
  "HallPassSMP",
  "EternalChaosMC",
];
