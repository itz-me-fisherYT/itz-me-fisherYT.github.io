import { skillGroups } from "../../data/skills";
import { Heading, Reveal } from "../ui/Shared";
import { Icon } from "../ui/Icon";
export function Skills() {
  return (
    <section id="skills" className="section container">
      <Heading
        number="03"
        label="MY TOOLBOX"
        title="The tools behind the ideas."
        copy="A mix of hands-on experience, ongoing experiments and things I’m learning along the way."
      />
      <div className="skills-grid">
        {skillGroups.map((group, i) => (
          <Reveal className="skill-card" key={group.name} delay={i * 0.05}>
            <div className="skill-heading">
              <span className="square-icon">
                <Icon name={group.icon} />
              </span>
              <span className="mono">0{i + 1}</span>
            </div>
            <h3>{group.name}</h3>
            <p>{group.note}</p>
            <div className="skill-tags">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
