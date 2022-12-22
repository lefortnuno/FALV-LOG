import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true,
});

instance.interceptors.request.use((config) => {
    config.headers["X-Auth-Token"] = localStorage.getItem("token");
    return config;
});

export default instance;
