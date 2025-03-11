import React, { useState } from "react";
import { searchGithubUsers, getGithubUserRepos } from "../services/request-helper";
import { RootState, AppDispatch  } from "../services/store";
import { useDispatch, useSelector } from "react-redux";
import Action from "./redux/Action";

const GithubSearch: React.FC = () => {
  //const [username, setUsername] = useState("");
  //const [users, setUsers] = useState<any[]>([]);
  //const [repos, setRepos] = useState<any[]>([]);
  //const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const username = useSelector((state: RootState) => state.github.username);
  const users = useSelector((state: RootState) => state.github.users);
  const repos = useSelector((state: RootState) => state.github.repos);
  const selectedUser = useSelector((state: RootState) => state.github.selectedUser);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  console.log("username", username);
  console.log("exp", expandedUser)


 const handleSearch = async () => {
  if (username.trim() !== "") {
    dispatch(Action.searchGithub(username));
  }
};

const handleUserClick = (user: any) => {
  if (expandedUser === user.login) {
    setExpandedUser(null); 
    dispatch(Action.selectUser("")); 
  } else {
    setExpandedUser(user.login);
    dispatch(Action.selectUser(user.login));
    dispatch(Action.getRepos(user.login));
  }
};

return (
  <div className="flex items-center justify-center min-h-screen p-2">
  <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">

  <div className=" max-w-md mx-auto p-4">
    <h2 className="text-2xl font-bold mb-4 text-center">GitHub User Search</h2>

    
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => dispatch(Action.updateUsername(e.target.value))}
        className="flex-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
      <div className="w-full mt-2">
      <button 
        onClick={handleSearch} 
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition cursor-pointer"
      >
        Search
      </button>

      </div>


    
    {users && users.length > 0 && (
      <div className="mt-4">
        {username !== "" || username !== "" && expandedUser !== null ? (
          <h3 className="text-lg font-semibold mb-2">Showing users for "{username}"</h3>
        ) : ""}
        <ul className="space-y-2 rounded-md overflow-hidden">
          {users.map((user) => (
            <li key={user.id} className="hover:bg-gray-100 mb-1 last:border-none gap-2 mb-2">
              <button
                className="w-full flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-md shadow"
                onClick={() => handleUserClick(user)}
              >
                {user.login}
                <span>{expandedUser === user.login ? "▲" : "▼"}</span>
              </button>

              
              {expandedUser === user.login && (
                <ul className="bg-gray-50 p-2 text-black">
                  {repos.length > 0 ? (
                    repos.map((repo) => (
                      <li key={repo.id} className="flex justify-between items-center p-2 border-b text-black">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline break-words max-w-full"
                        >
                          {repo.name}
                        </a>
                        <span className="text-yellow-500 font-semibold">⭐ {repo.stargazers_count}</span>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No repositories found.</p>
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>

  </div>
  </div>


);

};


export default GithubSearch;
