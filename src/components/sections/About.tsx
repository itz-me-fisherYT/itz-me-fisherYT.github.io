import { Heading, Reveal } from "../ui/Shared";
import { Icon } from "../ui/Icon";
const interests = [
  ["code", "Programming", "From an idea to something useful."],
  ["gamepad", "Gaming", "Better with good company."],
  ["wrench", "Technology", "Taking it apart. Figuring it out."],
  ["mountain", "Quad bikes", "A Yamaha and a bit of dirt."],
  ["camera", "Photography", "A different way to see things."],
  ["users", "Communities", "Building places to belong."],
];
export function About() {
  return (
    <section id="about" className="section container">
      <Heading
        number="01"
        label="THE PERSON BEHIND THE SCREEN"
        title="Curious by nature. Creator by choice."
      />
      <div className="about-layout">
        <Reveal className="about-story">
          <div className="about-monogram" aria-hidden="true">
            IF<span>↗</span>
          </div>
          <h3>
            Luke in real life.
            <br />
            <span>Fisher everywhere else.</span>
          </h3>
          <p>
            I’m Luke Fisher, better known online as ItzRealFisher or simply
            Fisher. I’m an 18-year-old developer and gamer from North
            Queensland, Australia.
          </p>
          <p>
            I enjoy building projects, experimenting with new technologies,
            running gaming communities and learning how things work. From
            Discord bots and Minecraft plugins to Roblox scripting and
            remote-management tools, there’s always something new on my screen.
          </p>
          <p>
            Outside of coding, I’m usually gaming, working on computers, riding
            my Yamaha quad bike or enjoying life in rural Queensland.
          </p>
          <span className="small-label">
            <Icon name="location" size={14} /> NORTH QUEENSLAND, AUSTRALIA
          </span>
        </Reveal>
        <div className="interest-grid">
          {interests.map(([icon, title, copy], i) => (
            <Reveal key={title} delay={i * 0.04} className="interest-card">
              <Icon name={icon} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
