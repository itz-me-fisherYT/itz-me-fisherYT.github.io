import { useRepositories } from "../../hooks/useRepositories";
import { existingProjects } from "../../data/projects";
import { getSocial } from "../../data/socials";
import { External } from "../ui/Shared";
import { Icon } from "../ui/Icon";
export function GitHubShowcase() {
  const { repositories, status } = useRepositories();
  return (
    <div className="github-showcase container">
      <div className="github-title">
        <div>
          <h3>
            <Icon name="github" /> From my GitHub
          </h3>
          <p role="status">{status}</p>
        </div>
        <External className="text-link" href={getSocial("GitHub").url!}>
          All repositories <Icon name="arrow" size={16} />
        </External>
      </div>
      <div className="repo-grid">
        {repositories.length
          ? repositories.map((repo) => (
              <External
                key={repo.id}
                href={repo.html_url}
                className="repo-card"
              >
                <h4>
                  {repo.name}
                  <Icon name="arrow" size={15} />
                </h4>
                <p>{repo.description || "A public project from my GitHub."}</p>
                <div>
                  <span>{repo.language || "Language not specified"}</span>
                  <span>☆ {repo.stargazers_count}</span>
                </div>
              </External>
            ))
          : existingProjects.slice(0, 3).map((repo) => (
              <External
                key={repo.name}
                href={repo.github}
                className="repo-card"
              >
                <h4>
                  {repo.name}
                  <Icon name="arrow" size={15} />
                </h4>
                <p>{repo.description}</p>
                <div>Selected from the previous portfolio</div>
              </External>
            ))}
      </div>
    </div>
  );
}
