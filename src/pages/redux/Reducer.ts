import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GithubSearchState {
  username: string;
  users: any[]; 
  repos: any[]; 
  selectedUser: string | null;
}

const initialState: GithubSearchState = {
  username: "",
  users: [],
  repos: [],
  selectedUser: null,
};

const githubSearchSlice = createSlice({
  name: "githubSearch",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setUsers: (state, action: PayloadAction<any[]>) => {
      state.users = action.payload;
    },
    setRepos: (state, action: PayloadAction<any[]>) => {
      state.repos = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<string | null>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setUsername, setUsers, setRepos, setSelectedUser } = githubSearchSlice.actions;
export default githubSearchSlice.reducer;
