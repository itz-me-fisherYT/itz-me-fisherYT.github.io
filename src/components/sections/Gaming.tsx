import { communities } from "../../data/projects";
import { Heading, Reveal } from "../ui/Shared";
import { Icon } from "../ui/Icon";
export function Gaming() {
  return (
    <section id="gaming" className="section gaming-section">
      <div className="container">
        <Heading
          number="04"
          label="MORE THAN JUST A PLAYER"
          title="Good games. Better communities."
          copy="Gaming is where a lot of my projects start. Building something for the people you play with just hits different."
        />
        <div className="gaming-grid">
          <Reveal className="squad-card">
            <div className="squad-art" aria-hidden="true">
              <div className="squad-rings" />
              <Icon name="users" size={72} />
              <span>THE SPECIAL SQUAD</span>
            </div>
            <div className="squad-copy">
              <span className="eyebrow">DISCORD COMMUNITY</span>
              <h3>
                The Special Squad<span>.</span>
              </h3>
              <p>
                A place for Roblox, Murder Mystery 2, Minecraft and general
                gaming. Community interaction, moderation and events bring it
                together, with BlockBoss helping support community management.
              </p>
              <a className="text-link" href="#contact">
                Ask me about the squad <Icon name="arrow" size={16} />
              </a>
            </div>
          </Reveal>
          <div className="gaming-side">
            <Reveal className="gaming-card">
              <Icon name="blocks" size={30} />
              <h3>Built with blocks.</h3>
              <p>
                Minecraft communities, custom plugins and server integrations.
                From troubleshooting performance to bringing chat and
                communities together.
              </p>
              <div className="tags">
                <span>Minecraft</span>
                <span>Java</span>
                <span>Server tools</span>
              </div>
            </Reveal>
            <Reveal className="gaming-card roblox-card">
              <Icon name="roblox" size={30} />
              <h3>Script. Test. Repeat.</h3>
              <p>
                Roblox scripting, interface experiments, automation projects and
                gameplay communities. An ongoing space to try ideas and learn.
              </p>
              <div className="tags">
                <span>Roblox</span>
                <span>Luau</span>
                <span>UI experiments</span>
              </div>
            </Reveal>
          </div>
        </div>
        <details className="archive">
          <summary>
            <span>
              <Icon name="blocks" /> Communities along the way
            </span>
            <span>
              A little history <span className="plus">+</span>
            </span>
          </summary>
          <p>
            Historical Minecraft communities I’ve been involved with. These
            references do not indicate that a server is currently operating.
          </p>
          <div className="community-history">
            {communities.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
