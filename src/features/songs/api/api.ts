import { Songs, Statis } from "./apiTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function fetchSongsFromAPI(): Promise<Songs[]> {
  const response = await fetch(`${API_BASE_URL}/api/songs`);
  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }
  return response.json();
}

export async function fetchStatsFromAPI(): Promise<Statis> {
  const response = await fetch(`${API_BASE_URL}/api/stats`);
  if (!response.ok) {
    throw new Error("Failed to fetch stats");
  }
  return response.json();
}
