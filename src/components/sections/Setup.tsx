import { hardware } from "../../data/hardware";
import { Heading, Reveal } from "../ui/Shared";
import { Icon } from "../ui/Icon";
export function Setup() {
  return (
    <section id="setup" className="section container">
      <div className="heading-row">
        <Heading
          number="05"
          label="WHERE IT ALL HAPPENS"
          title="My everyday setup."
          copy="The hardware behind the code, the games and the occasional late-night experiment."
        />
        <span className="outline-label">BUILT WITH WHAT I HAVE</span>
      </div>
      <div className="hardware-grid">
        {hardware.map((device, i) => (
          <Reveal className="hardware-card" key={device.name} delay={i * 0.06}>
            <div className="hardware-art" aria-hidden="true">
              <Icon name={device.icon} size={78} />
              <span>0{i + 1}</span>
            </div>
            <p className="eyebrow">{device.kind}</p>
            <h3>{device.name}</h3>
            <ul>
              {device.specs.map((spec) => (
                <li key={spec}>
                  <span />
                  {spec}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
