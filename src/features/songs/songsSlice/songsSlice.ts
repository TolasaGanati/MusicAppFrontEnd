import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState: SongsState = {
  songs: [],
  stats: {
    totalSongs: 0,
    totalArtists: 0,
    totalAlbums: 0,
    totalGenres: 0,
    songsPerGenre: {},
    songsPerArtist: {},
    albumsPerArtist: {},
    songsPerAlbum: {},
  },
  status: "idle",
  error: null,
};

export const fetchSongs = createAsyncThunk(
  "songs/fetchSongs",
  async (_, { rejectWithValue }) => {
    console.log("Fetching songs..."); // Confirm this is executed
    console.log("API_BASE_URL:", API_BASE_URL); // Confirm the API base URL

    try {
      const response = await axios.get(`/api/songs`);
      console.log("=======API response:", response.data);

      if (!Array.isArray(response.data)) {
        throw new Error("Data is not an array");
      }
      return response.data as Song[];
    } catch (error) {
      console.error("Error fetching songs:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);






export const deleteSong = createAsyncThunk(
  "songs/deleteSong",
  async (songId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/songs/${songId}`);
      return songId;
    } catch (error) {
      console.error("Error deleting song:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const updateSong = createAsyncThunk(
  "songs/updateSong",
  async (updatedSong: Song, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/songs/${updatedSong._id}`,
        updatedSong
      );
      return response.data as Song;
    } catch (error) {
      console.error("Error updating song:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setSongs(state, action: PayloadAction<Song[]>) {
      console.log("Setting songs:", action.payload);
      state.songs = action.payload;
      calculateStats(state);
    },
    setStats(state, action: PayloadAction<Stats>) {
      state.stats = action.payload;
    },
    addSong(state, action: PayloadAction<Song>) {
      console.log("Adding song:", action.payload);
      state.songs.push(action.payload);
      calculateStats(state);
    },
    fetchStats(state) {
      calculateStats(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSongs.fulfilled, (state, action: PayloadAction<Song[]>) => {
        console.log("Fetched songs:", action.payload);
        state.status = "idle";
        state.songs = Array.isArray(action.payload) ? action.payload : [];
        calculateStats(state);
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(deleteSong.fulfilled, (state, action: PayloadAction<string>) => {
        console.log("Deleted song ID:", action.payload);
        state.songs = state.songs.filter((song) => song._id !== action.payload);
        calculateStats(state);
      })
      .addCase(deleteSong.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateSong.fulfilled, (state, action: PayloadAction<Song>) => {
        console.log("Updated song:", action.payload);
        const index = state.songs.findIndex(
          (song) => song._id === action.payload._id
        );
        if (index !== -1) {
          state.songs[index] = action.payload;
          calculateStats(state);
        }
      })
      .addCase(updateSong.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

function calculateStats(state: SongsState) {
  const { songs } = state;

  if (!Array.isArray(songs)) {
    console.error("songs is not an array:", songs);
    return;
  }

  state.stats.totalSongs = songs.length;

  const uniqueArtists = new Set(songs.map((song) => song.artist));
  const uniqueAlbums = new Set(songs.map((song) => song.album));
  const uniqueGenres = new Set(songs.map((song) => song.genre));

  state.stats.totalArtists = uniqueArtists.size;
  state.stats.totalAlbums = uniqueAlbums.size;
  state.stats.totalGenres = uniqueGenres.size;

  state.stats.songsPerGenre = songs.reduce((acc, song) => {
    acc[song.genre] = (acc[song.genre] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  state.stats.songsPerArtist = songs.reduce((acc, song) => {
    acc[song.artist] = (acc[song.artist] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const albumsPerArtist = songs.reduce((acc, song) => {
    if (!acc[song.artist]) {
      acc[song.artist] = new Set<string>();
    }
    acc[song.artist].add(song.album);
    return acc;
  }, {} as Record<string, Set<string>>);

  state.stats.albumsPerArtist = Object.entries(albumsPerArtist).reduce(
    (acc, [artist, albumsSet]) => {
      acc[artist] = albumsSet.size; // Convert Set<string> to number
      return acc;
    },
    {} as Record<string, number>
  );

  state.stats.songsPerAlbum = songs.reduce((acc, song) => {
    acc[song.album] = (acc[song.album] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

export const { setSongs, setStats, addSong, fetchStats } = songsSlice.actions;
export default songsSlice.reducer;

export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface Stats {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsPerGenre: Record<string, number>;
  songsPerArtist: Record<string, number>;
  albumsPerArtist: Record<string, number>;
  songsPerAlbum: Record<string, number>;
}

export interface SongsState {
  songs: Song[];
  stats: Stats;
  status: "idle" | "loading" | "failed";
  error: string | null;
}
