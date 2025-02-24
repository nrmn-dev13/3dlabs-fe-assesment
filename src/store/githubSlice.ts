import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GitHubUsers, GitHubRepo, Items } from '../types';

interface GithubState {
  user: GitHubUsers | null;
  repos: GitHubRepo[];
  selectedRepo: string | null;
  readmeContent: string | null;
  loading: boolean;
  error: string | null;
  items: Items[]
}

const initialState: GithubState = {
  user: null,
  repos: [],
  items: [],
  selectedRepo: null,
  readmeContent: null,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  'github/fetchUser',
  async (username: string) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error('User not found');
    return response.json();
  }
);
export const fetchItems = createAsyncThunk(
  'github/fetchItems',
  async (username: string) => {
    const response = await fetch(`https://api.github.com/search/users?q=${username}`);
    
    if (!response.ok) throw new Error('User not found');
    return response.json();
  }
);

export const fetchUserRepos = createAsyncThunk(
  'github/fetchUserRepos',
  async (username: string) => {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) throw new Error('Failed to fetch repositories');
    return response.json();
  }
);

export const fetchReadme = createAsyncThunk(
  'github/fetchReadme',
  async ({ owner, repo }: { owner: string; repo: string }) => {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          Accept: 'application/vnd.github.raw',
        },
      }
    );
    if (!response.ok) throw new Error('README not found');
    return response.text();
  }
);

const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    clearState: (state) => {
      state.user = null;
      state.repos = [];
      state.selectedRepo = null;
      state.readmeContent = null;
      state.error = null;
    },
    setSelectedRepo: (state, action: PayloadAction<string>) => {
      state.selectedRepo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {        
        state.loading = false;
        state.items = action.payload.items;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch repositories';
      })
      .addCase(fetchUserRepos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.repos = action.payload;
      })
      .addCase(fetchUserRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch repositories';
      })
      .addCase(fetchReadme.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReadme.fulfilled, (state, action) => {
        state.loading = false;
        state.readmeContent = action.payload;
      })
      .addCase(fetchReadme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch README';
      });
  },
});

export const { clearState, setSelectedRepo } = githubSlice.actions;
export default githubSlice.reducer;