import { profile } from "./profile";

export type Social = {
  platform: string;
  username: string;
  url?: string;
  candidateUrl?: string;
  icon: string;
  category: "Social" | "Community" | "Support" | "Links";
  enabled: boolean;
  verified: "api-confirmed" | "owner-supplied" | "needs-verification";
};
export const socials: Social[] = [
  {
    platform: "GitHub",
    username: "itz-me-fisherYT",
    url: "https://github.com/itz-me-fisherYT",
    icon: "github",
    category: "Social",
    enabled: true,
    verified: "api-confirmed",
  },
  {
    platform: "Discord",
    username: profile.discord,
    url: `https://discord.com/users/${profile.discordId}`,
    icon: "discord",
    category: "Community",
    enabled: true,
    verified: "owner-supplied",
  },
  {
    platform: "YouTube",
    username: "ItzRealFisherYT",
    candidateUrl: "https://youtube.com/@ItzRealFisherYT",
    icon: "youtube",
    category: "Social",
    enabled: true,
    verified: "needs-verification",
  },
  {
    platform: "TikTok",
    username: "itzrealfisher",
    url: "https://www.tiktok.com/@itzrealfisher",
    icon: "tiktok",
    category: "Social",
    enabled: true,
    verified: "owner-supplied",
  },
  {
    platform: "Roblox",
    username: "ItzOnlyFisher",
    url: "https://www.roblox.com/users/8942431123/profile",
    icon: "roblox",
    category: "Community",
    enabled: true,
    verified: "api-confirmed",
  },
  {
    platform: "Snapchat",
    username: "lfish94ll",
    url: "https://www.snapchat.com/add/lfish94ll",
    icon: "snapchat",
    category: "Social",
    enabled: true,
    verified: "owner-supplied",
  },
  {
    platform: "Ko-fi",
    username: "itzrealfisheryt",
    candidateUrl: "https://ko-fi.com/itzrealfisheryt",
    icon: "coffee",
    category: "Support",
    enabled: true,
    verified: "needs-verification",
  },
  {
    platform: "Slat.cc",
    username: "ItzRealFisher",
    candidateUrl: "https://slat.cc/ItzRealFisher",
    icon: "link",
    category: "Links",
    enabled: true,
    verified: "needs-verification",
  },
  {
    platform: "Guns.lol",
    username: "itzrealfisher",
    candidateUrl: "https://guns.lol/itzrealfisher",
    icon: "crosshair",
    category: "Links",
    enabled: true,
    verified: "needs-verification",
  },
  {
    platform: "PayPal",
    username: "ItzOnlyFisher",
    url: "https://paypal.me/ItzOnlyFisher",
    icon: "wallet",
    category: "Support",
    enabled: true,
    verified: "owner-supplied",
  },
  {
    platform: "Feds.lol",
    username: "ItzRealFisher",
    url: "https://feds.lol/ItzRealFisher",
    icon: "shield",
    category: "Links",
    enabled: true,
    verified: "owner-supplied",
  },
];
export const getSocial = (platform: string) =>
  socials.find((s) => s.platform === platform)!;
