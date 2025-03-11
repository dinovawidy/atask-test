

interface GithubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
}

export const searchGithubUsers = async (username: string): Promise<GithubUser[]> => {
  try {
    const response = await fetch(`https://api.github.com/search/users?q=${username}&per_page=5`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    return data.items || []; 
  } catch (error) {
    console.error("Error fetching GitHub users:", error);
    return [];
  }
};

export const getGithubUserRepos = async (username: string): Promise<GithubRepo[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching repos for ${username}:`, error);
    return [];
  }
};

