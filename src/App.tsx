import { MotionConfig } from "motion/react";
import { Navigation } from "./components/layout/Navigation";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Gaming } from "./components/sections/Gaming";
import { Setup } from "./components/sections/Setup";
import { Socials } from "./components/sections/Socials";
import { GitHubShowcase } from "./components/sections/GitHubShowcase";
import { Contact } from "./components/sections/Contact";
import { profile } from "./data/profile";
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        {profile.githubShowcase && <GitHubShowcase />}
        <Skills />
        <Gaming />
        <Setup />
        <Socials />
        <Contact />
      </main>
      <footer className="footer container">
        <a className="brand" href="#home">
          <span className="brand-mark">
            f<span>.</span>
          </span>
          <span>
            ItzRealFisher<span className="brand-dot">.</span>
          </span>
        </a>
        <span>Made with curiosity in North Queensland.</span>
        <span>
          © {new Date().getFullYear()} Luke Fisher{" "}
          <a href="#home" aria-label="Back to top">
            ↑
          </a>
        </span>
      </footer>
    </MotionConfig>
  );
}
