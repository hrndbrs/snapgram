import axios from "axios";

export const serverClient = axios.create({
	baseURL: import.meta.env.VITE_BASE_SERVER_URL!,
	withCredentials: true,
});
