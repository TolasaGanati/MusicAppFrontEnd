export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface Stats {
  songsPerAlbum(songsPerAlbum: unknown): unknown;
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsPerGenre: Record<string, number>;
  songsPerArtist: Record<string, number>;
  albumsPerArtist: Record<string, number>;
}

export interface SongsState {
  songs: Song[];
  stats: Stats;
  status: "idle" | "loading" | "failed";
  error: string | null;
}
