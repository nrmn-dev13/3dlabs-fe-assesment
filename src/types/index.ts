export interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    default_branch: string;
  }
  
  export interface GitHubUsers {
    login: string;
    avatar_url: string;
    name: string;
    bio: string;
    public_repos: number;
    following: number;
    followers: number;
    company: string;
    location: string;
  }
  export interface Items {
    login: string;
    avatar_url: string;
    id: number;
  }