import { motion, useReducedMotion } from "motion/react";
import { profile } from "../../data/profile";
import { getSocial } from "../../data/socials";
import { CopyButton, External } from "../ui/Shared";
import { Icon } from "../ui/Icon";
export function Hero() {
  const reduced = useReducedMotion();
  return (
    <section id="home" className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-layout container">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="hero-copy"
        >
          <p className="location-pill">
            <span className="status-light" /> A LITTLE CORNER OF THE INTERNET
          </p>
          <h1>
            Hey, I’m{" "}
            <span className="gradient-text">
              Fisher<span className="hero-period">.</span>
            </span>
          </h1>
          <p className="hero-roles">
            Developer<span>/</span>Gamer<span>/</span>Creator
          </p>
          <p className="hero-description">{profile.bio}</p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">
              View my projects <Icon name="arrow" size={18} />
            </a>
            <a className="button secondary" href="#socials">
              Connect with me <Icon name="discord" size={18} />
            </a>
          </div>
          <div className="hero-meta">
            <span>
              <Icon name="location" size={15} />
              {profile.location}
            </span>
            <span className="meta-line" />
            <External href={getSocial("GitHub").url!} label="Fisher on GitHub">
              <Icon name="github" size={18} />
            </External>
            <CopyButton value={profile.discord} className="icon-copy">
              <Icon name="discord" size={18} />
              <span className="sr-only">Copy Discord username</span>
            </CopyButton>
          </div>
        </motion.div>
        <motion.div
          className="hero-visual"
          initial={reduced ? false : { opacity: 0, y: 25, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="floating-tag tag-top">
            <Icon name="code" size={16} /> turning ideas into code
          </div>
          <div className="terminal-window">
            <div className="terminal-toolbar">
              <div className="window-dots">
                <i />
                <i />
                <i />
              </div>
              <span>fisher@north-queensland: ~</span>
              <Icon name="terminal" size={14} />
            </div>
            <div className="terminal-body">
              <p className="terminal-command">
                <span>❯</span> cat developer.json
              </p>
              <div className="code-content">
                <span>{"{"}</span>
                <p>
                  <em>"name"</em>: <b>"Luke Fisher"</b>,
                </p>
                <p>
                  <em>"alias"</em>: <b>"ItzRealFisher"</b>,
                </p>
                <p>
                  <em>"location"</em>: <b>"Australia 🇦🇺"</b>,
                </p>
                <p>
                  <em>"interests"</em>: [
                </p>
                <p className="code-indent">
                  <b>"building cool things"</b>,
                </p>
                <p className="code-indent">
                  <b>"gaming with good people"</b>,
                </p>
                <p className="code-indent">
                  <b>"figuring it out"</b>
                </p>
                <p>],</p>
                <p>
                  <em>"mindset"</em>: <b>"keep learning"</b>
                </p>
                <span>{"}"}</span>
              </div>
              <p className="terminal-command last-command">
                <span>❯</span> npm run create
                <span className="cursor" />
              </p>
            </div>
            <div className="terminal-footer">
              <span>
                <i /> always experimenting
              </span>
              <span>UTF-8</span>
            </div>
          </div>
          <div className="floating-tag tag-bottom">
            <span className="mini-avatar">IF</span>
            <div>
              <strong>Made of curiosity.</strong>
              <span>Powered by a few too many tabs.</span>
            </div>
            <Icon name="sparkles" size={20} />
          </div>
        </motion.div>
      </div>
      <div className="hero-bottom container">
        <span>BUILD. BREAK. FIX. IMPROVE. REPEAT.</span>
        <a href="#about">
          SCROLL TO EXPLORE <span>↓</span>
        </a>
      </div>
    </section>
  );
}
