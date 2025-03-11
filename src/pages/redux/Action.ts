import { setUsername, setUsers, setRepos, setSelectedUser } from "./Reducer";
import { searchGithubUsers, getGithubUserRepos } from "../../services/request-helper";
import { AppDispatch } from "../../services/store"; 

const updateUsername = (username: string) => (dispatch: AppDispatch) => {
  dispatch(setUsername(username));
};

const searchGithub = (username: string) => async (dispatch: AppDispatch) => {
  const results = await searchGithubUsers(username);
  dispatch(setUsers(results));
  dispatch(setRepos([])); 
};

const getRepos = (username: string) => async (dispatch: AppDispatch) => {
  const userRepos = await getGithubUserRepos(username);
  dispatch(setRepos(userRepos));
};

const selectUser = (username: string) => (dispatch: AppDispatch) => {
  dispatch(setSelectedUser(username));
};

const Action = {
  updateUsername,
  searchGithub,
  getRepos,
  selectUser,
};

export default Action;
