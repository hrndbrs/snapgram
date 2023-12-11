import axios from "axios";

export const serverClient = axios.create({
	baseURL: (import.meta.env.VITE_BASE_URL as string) || "http://localhost:5000",
});
