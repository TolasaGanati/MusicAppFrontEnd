import { Songs, Statis } from "./apiTypes";

export async function fetchSongsFromAPI(): Promise<Songs[]> {
  const response = await fetch("/api/songs");
  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }
  return response.json();
}

export async function fetchStatsFromAPI(): Promise<Statis> {
  const response = await fetch("/api/stats");
  if (!response.ok) {
    throw new Error("Failed to fetch stats");
  }
  return response.json();
}
