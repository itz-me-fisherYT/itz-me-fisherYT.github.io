import { profile } from "../../data/profile";
import { getSocial } from "../../data/socials";
import { CopyButton, External, Reveal } from "../ui/Shared";
import { Icon } from "../ui/Icon";
export function Contact() {
  return (
    <section id="contact" className="section contact-section container">
      <Reveal className="contact-panel">
        <div className="contact-grid" aria-hidden="true" />
        <p className="eyebrow">07 / KEEP THE CONVERSATION GOING</p>
        <h2>
          Got an idea?
          <br />
          <span className="gradient-text">Let’s talk about it.</span>
        </h2>
        <p>
          A project, a community, something you’re working on — or just a hello.
          <br />
          You know where to find me.
        </p>
        <div className="contact-actions">
          <CopyButton value={profile.discord} className="button primary">
            <Icon name="discord" size={18} />
            {profile.discord}
          </CopyButton>
          <External
            href={getSocial("GitHub").url!}
            className="button secondary"
          >
            <Icon name="github" size={18} /> Find me on GitHub{" "}
            <Icon name="arrow" size={16} />
          </External>
          {profile.email && (
            <a className="button secondary" href={`mailto:${profile.email}`}>
              Email me <Icon name="arrow" size={16} />
            </a>
          )}
        </div>
        <span className="contact-caption">
          DISCORD USERNAME · CLICK TO COPY
        </span>
      </Reveal>
    </section>
  );
}
