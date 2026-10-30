import { useEffect, useState } from "react";
import { profile } from "../data/profile";
type Repository = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
};
type Cache = { time: number; repositories: Repository[] };
const key = `fisher-repositories-v1-${profile.github}`;
function isRepository(value: unknown): value is Repository {
  if (!value || typeof value !== "object") return false;
  const r = value as Repository;
  return (
    typeof r.id === "number" &&
    typeof r.name === "string" &&
    typeof r.html_url === "string" &&
    r.html_url.startsWith(`https://github.com/${profile.github}/`) &&
    (r.description === null || typeof r.description === "string") &&
    (r.language === null || typeof r.language === "string") &&
    typeof r.stargazers_count === "number" &&
    typeof r.fork === "boolean"
  );
}
export function useRepositories() {
  const [state, setState] = useState<{
    repositories: Repository[];
    status: string;
  }>({ repositories: [], status: "Loading public repositories…" });
  useEffect(() => {
    if (!profile.githubShowcase) return;
    const controller = new AbortController();
    async function get() {
      let cached: Cache | undefined;
      try {
        const parsed = JSON.parse(localStorage.getItem(key) || "null");
        if (
          parsed &&
          typeof parsed.time === "number" &&
          Array.isArray(parsed.repositories) &&
          parsed.repositories.every(isRepository)
        )
          cached = parsed;
      } catch {
        /* Storage may be unavailable. */
      }
      if (cached && Date.now() - cached.time < 3_600_000) {
        setState({
          repositories: cached.repositories,
          status: "Cached public GitHub data",
        });
        return;
      }
      const timeout = setTimeout(() => controller.abort(), 8000);
      try {
        const response = await fetch(
          `https://api.github.com/users/${profile.github}/repos?sort=updated&per_page=30`,
          {
            signal: controller.signal,
            headers: { Accept: "application/vnd.github+json" },
          },
        );
        if (!response.ok) throw new Error("GitHub unavailable");
        const body: unknown = await response.json();
        if (!Array.isArray(body) || !body.every(isRepository))
          throw new Error("Invalid response");
        const repositories = body.filter((r) => !r.fork).slice(0, 3);
        if (controller.signal.aborted) return;
        setState({
          repositories,
          status: "Public GitHub data · cached for one hour",
        });
        try {
          localStorage.setItem(
            key,
            JSON.stringify({ time: Date.now(), repositories }),
          );
        } catch {
          /* Cache is optional. */
        }
      } catch {
        if (cached)
          setState({
            repositories: cached.repositories,
            status: "Saved GitHub data · live update unavailable",
          });
        else
          setState({
            repositories: [],
            status:
              "Live GitHub data unavailable. Explore selected repositories below.",
          });
      } finally {
        clearTimeout(timeout);
      }
    }
    void get();
    return () => controller.abort();
  }, []);
  return state;
}
