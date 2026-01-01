'use client';

import Hero from "@/components/Hero";
import { useState, useEffect } from "react";

const GITHUB_USERNAME = "aakash-01-1996";
const SELECTED_REPOS = [
  "AI-Mock-Interview",
  "StrategicTrio",
  "CineMind",
  "CodeSpark",
  "HarryPotter-Trivia",
  "PokeDex",
  "MLFlow",
];

const CACHE_KEY = "github_projects_cache";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

interface Project {
  name: string;
  description: string;
  githubLink: string;
  liveLink?: string;
  stars: number;
  addedDate: string;
}

const FALLBACK_PROJECTS: Project[] = [
  {
    name: "Project 1",
    description: "This is a description of Project 1.",
    githubLink: "https://github.com/aakash-01-1996/project1",
    liveLink: "",
    stars: 50,
    addedDate: "2025-12-01",
  },
  {
    name: "Project 2",
    description: "This is a description of Project 2.",
    githubLink: "https://github.com/aakash-01-1996/project2",
    liveLink: "",
    stars: 30,
    addedDate: "2025-11-15",
  },
  {
    name: "Project 3",
    description: "This is a description of Project 3.",
    githubLink: "https://github.com/aakash-01-1996/project3",
    liveLink: "",
    stars: 70,
    addedDate: "2025-12-05",
  },
];

function escapeHtml(str: string): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(str: string): string {
  if (!str) return "";
  return String(str).replace(/"/g, "&quot;");
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [sortBy, setSortBy] = useState("stars");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const getCachedProjects = (): Project[] | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();

      if (now - timestamp > CACHE_DURATION) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      return data;
    } catch (err) {
      console.warn("Could not read cache:", err);
      return null;
    }
  };

  const setCachedProjects = (data: Project[]) => {
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: data,
          timestamp: Date.now(),
        })
      );
    } catch (err) {
      console.warn("Could not cache projects:", err);
    }
  };

  const fetchProjects = async () => {
    setLoading(true);

    let cachedProjects = getCachedProjects();
    let fetched: Project[] | null = null;

    if (cachedProjects) {
      console.log("Using cached projects");
      fetched = cachedProjects;
    } else {
      console.log("Fetching fresh projects from GitHub");
      try {
        const url = `https://api.github.com/users/${encodeURIComponent(
          GITHUB_USERNAME
        )}/repos?per_page=100`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const raw = await res.json();
        const filtered = Array.isArray(raw) ? raw.filter((r: any) => !r.fork) : [];
        
        fetched = filtered.map((repo: any) => ({
          name: repo.name,
          description: repo.description || "Work in progress..",
          githubLink: repo.html_url,
          liveLink: repo.homepage || "",
          stars: repo.stargazers_count || 0,
          addedDate: repo.created_at || repo.pushed_at || new Date().toISOString(),
        }));

        if (fetched) {
          setCachedProjects(fetched);
        }
      } catch (err) {
        console.warn("Could not fetch GitHub repos:", err);
        fetched = null;
      }
    }

    let finalProjects: Project[] = [];
    if (Array.isArray(fetched) && fetched.length) {
      if (Array.isArray(SELECTED_REPOS) && SELECTED_REPOS.length > 0) {
        const selectedSet = new Set(SELECTED_REPOS);
        finalProjects = fetched.filter((p) => selectedSet.has(p.name));
      } else {
        finalProjects = fetched;
      }
    } else {
      finalProjects = FALLBACK_PROJECTS;
    }

    setProjects(finalProjects);
    setLoading(false);
  };

  const getSortedProjects = () => {
    const sorted = [...projects].sort((a, b) => {
      if (sortBy === "stars") return (b.stars || 0) - (a.stars || 0);
      if (sortBy === "az") return (a.name || "").localeCompare(b.name || "");
      if (sortBy === "recent") return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
      return 0;
    });
    return sorted;
  };

  const sortedProjects = getSortedProjects();

  return (
    <main>
      <Hero title="My Projects" subtitle="Here’s some of my work. I like building useful things and trying out new technologies. Feel free to explore!" />
      <section style={{ padding: "2rem 3rem", background: "var(--bg-primary)", color: "var(--text-primary)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <label htmlFor="sort" style={{ marginRight: "0.5rem", fontWeight: "600" }}>
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid var(--border-color)",
                  background: "var(--card-bg)",
                  color: "var(--text-primary)",
                  cursor: "pointer",
                }}
              >
                <option value="stars">Most Stars</option>
                <option value="az">A-Z</option>
                <option value="recent">Recently Added</option>
              </select>
            </div>
            <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              {sortedProjects.length} projects
            </span>
          </div>

          {loading ? (
            <div className="project-loading" style={{ textAlign: "center", padding: "2rem" }}>
              Loading projects…
            </div>
          ) : (
            <div
              id="projects-list"
              className="projects-grid"
            >
              {sortedProjects.map((project) => (
                <div key={project.name} className="project-tile">
                  <div className="project-header">
                    <span className="project-name">{escapeHtml(project.name)}</span>
                    <a
                      href={escapeAttr(project.githubLink)}
                      target="_blank"
                      rel="noopener"
                      className="project-link"
                      title="Open on GitHub"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                  <p className="project-description">{escapeHtml(project.description || "")}</p>
                  <div className="project-footer">
                    <span className="project-stars">★ {project.stars || 0}</span>
                    <div className="project-buttons">
                      {project.liveLink ? (
                        <a
                          href={escapeAttr(project.liveLink)}
                          target="_blank"
                          rel="noopener"
                          className="view-live"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                          Live
                        </a>
                      ) : (
                        <span className="view-live disabled">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                          Live
                        </span>
                      )}
                      <a
                        href={escapeAttr(project.githubLink)}
                        target="_blank"
                        rel="noopener"
                        className="view-github"
                      >
                        {"{ Code }"}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="view-all" style={{ textAlign: "center", marginTop: "3rem" }}>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="view-all-btn"
              style={{
                display: "inline-flex",
                textDecoration: "none",
                color: "white",
                background: "var(--accent-color)",
                padding: "0.65rem 1.2rem",
                borderRadius: "999px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
              }}
            >
              View all projects on GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
