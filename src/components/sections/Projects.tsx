import { useEffect, useRef, useState } from "react";
import { projects, archive, existingProjects } from "../../data/projects";
import type { Project } from "../../data/projects";
import { Heading, Reveal, External } from "../ui/Shared";
import { Icon } from "../ui/Icon";
const filters = [
  "All projects",
  "Discord Bot",
  "Minecraft",
  "Roblox / Luau",
  "Web Development",
  "Automation",
  "Systems",
];
function ProjectDetails({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = dialog.current!;
    const previous = document.activeElement as HTMLElement;
    el.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      el.close();
      document.body.style.overflow = old;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <button
          className="dialog-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          <Icon name="x" />
        </button>
        <div className={`project-icon ${project.accent}`}>
          <Icon name={project.icon} size={30} />
        </div>
        <p className="eyebrow">{project.category}</p>
        <h2 id="project-dialog-title">{project.name}</h2>
        <span className="status-badge">{project.status}</span>
        <p>{project.description}</p>
        <h3>Project scope</h3>
        <ul>
          {project.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        {project.note && <p className="project-note">{project.note}</p>}
        <div className="tags">
          {project.technologies.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="dialog-links">
          {project.github && (
            <External href={project.github} className="button secondary">
              GitHub <Icon name="arrow" size={16} />
            </External>
          )}
          {project.url && (
            <External href={project.url} className="button secondary">
              Website <Icon name="arrow" size={16} />
            </External>
          )}
          {project.documentation && (
            <External href={project.documentation} className="text-link">
              Related store <Icon name="arrow" size={16} />
            </External>
          )}
        </div>
      </div>
    </dialog>
  );
}
export function Projects() {
  const [filter, setFilter] = useState("All projects");
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = projects.filter(
    (p) =>
      filter === "All projects" ||
      (filter === "Minecraft"
        ? p.category.startsWith("Minecraft")
        : p.category === filter),
  );
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="heading-row">
          <Heading
            number="02"
            label="IDEAS, BROUGHT TO LIFE"
            title="Things I’ve been building."
            copy="Bots, blocks, websites and a little bit of everything in between."
          />
          <span className="outline-label">
            <Icon name="code" size={14} /> SELECTED WORK
          </span>
        </div>
        <div
          className="project-filters"
          role="group"
          aria-label="Filter projects"
        >
          {filters.map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              className={filter === f ? "selected" : ""}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="project-grid">
          {visible.map((p, i) => (
            <Reveal
              key={p.id}
              delay={Math.min(i * 0.04, 0.16)}
              className={`project-card ${p.featured ? "featured" : ""} accent-${p.accent}`}
            >
              {p.image ? (
                <img
                  className="project-art project-screenshot"
                  src={p.image}
                  alt={`${p.name} project screenshot`}
                  loading="lazy"
                  width="640"
                  height="360"
                />
              ) : (
                <div className="project-art" aria-hidden="true">
                  <div className="art-grid" />
                  <div className="project-art-symbol">
                    <Icon name={p.icon} size={64} />
                  </div>
                  <span className="art-caption">
                    {p.id === "blockboss"
                      ? "YOUR COMMUNITY. CONNECTED."
                      : p.id === "canna"
                        ? "A WORLD WITHOUT LIMITS."
                        : p.id === "zenith"
                          ? "SURVIVE. EXPLORE. BELONG."
                          : p.category.toUpperCase()}
                  </span>
                  {p.featured && (
                    <span className="featured-label">↗ FEATURED</span>
                  )}
                </div>
              )}
              <div className="project-body">
                <div className="project-category">
                  {p.category}
                  <span className="project-arrow">
                    <Icon name="arrow" />
                  </span>
                </div>
                <h3>
                  <button onClick={() => setSelected(p)}>
                    {p.name}
                    <span className="sr-only"> — view details</span>
                  </button>
                </h3>
                <p>{p.description}</p>
                <div className="tags">
                  {p.technologies.slice(0, 3).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="card-bottom">
                  <span>
                    <i />
                    {p.status}
                  </span>
                  <button onClick={() => setSelected(p)}>
                    Explore <span>↗</span>
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <details className="archive">
          <summary>
            <span>
              <Icon name="code" /> From the previous portfolio
            </span>
            <span>
              More public work <span className="plus">+</span>
            </span>
          </summary>
          <div className="existing-grid">
            {existingProjects.map((p) => (
              <article key={p.name}>
                {p.image && (
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    width="44"
                    height="44"
                  />
                )}
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <External href={p.github} className="text-link">
                  Repository <Icon name="arrow" size={15} />
                </External>
              </article>
            ))}
          </div>
        </details>
        <details className="archive">
          <summary>
            <span>
              <Icon name="terminal" /> The project archive
            </span>
            <span>
              Historical experiments <span className="plus">+</span>
            </span>
          </summary>
          <p>
            Earlier projects and experiments. Details and current availability
            await verification.
          </p>
          <div className="archive-list">
            {archive.map((name) => (
              <span key={name}>
                {name}
                <small>Historical reference</small>
              </span>
            ))}
          </div>
        </details>
      </div>
      {selected && (
        <ProjectDetails project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
