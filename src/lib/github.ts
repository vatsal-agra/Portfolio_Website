// GitHub service — reserved for the future "Refresh Projects" button (pre-launch feature).
// Currently not used — all project data is statically embedded in ProjectsSection.tsx.

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export const fetchGithubRepos = async (username: string): Promise<GithubRepo[]> => {
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  if (!response.ok) throw new Error('Failed to fetch repositories');
  return response.json();
};

export const fetchRepoReadme = async (username: string, repoName: string): Promise<string> => {
  const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/readme`, {
    headers: { Accept: 'application/vnd.github.v3.raw' },
  });
  if (!response.ok) return '';
  return response.text();
};

export const getRepoImageUrl = (username: string, repoName: string) =>
  `https://opengraph.githubassets.com/1/${username}/${repoName}`;
