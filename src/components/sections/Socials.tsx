import { socials } from "../../data/socials";
import { Heading, Reveal, CopyButton, External } from "../ui/Shared";
import { Icon } from "../ui/Icon";
export function Socials() {
  return (
    <section id="socials" className="section socials-section">
      <div className="container">
        <Heading
          number="06"
          label="ELSEWHERE ON THE INTERNET"
          title="Same Fisher. Different tabs."
          copy="Find my code, catch a video, say hello or explore the rest of my online world."
        />
        <div className="social-grid">
          {socials
            .filter((s) => s.enabled)
            .map((social, i) => {
              const content = (
                <>
                  <span className={`social-icon social-${social.icon}`}>
                    <Icon name={social.icon} size={24} />
                  </span>
                  <span className="social-text">
                    <strong>{social.platform}</strong>
                    <span>{social.username}</span>
                    {social.category === "Support" && (
                      <small>Voluntary support</small>
                    )}
                  </span>
                  <Icon name={social.url ? "arrow" : "copy"} size={18} />
                </>
              );
              return (
                <Reveal key={social.platform} delay={Math.min(i * 0.025, 0.15)}>
                  {social.url ? (
                    <External href={social.url} className="social-card">
                      {content}
                    </External>
                  ) : (
                    <CopyButton value={social.username} className="social-card">
                      {content}
                    </CopyButton>
                  )}
                </Reveal>
              );
            })}
        </div>
        <p className="social-note">
          <Icon name="heart" size={14} /> Ko-fi and PayPal are optional ways to
          support what I build. No pressure, ever.
        </p>
      </div>
    </section>
  );
}
