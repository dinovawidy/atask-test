import { createAlova } from "alova";
import adapterFetch from "alova/fetch";

const githubApi = createAlova({
    baseURL: "https://api.github.com",
    timeout: 5000,
    requestAdapter: adapterFetch(),
});

export default githubApi;
