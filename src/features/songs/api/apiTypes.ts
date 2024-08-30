export interface Songs {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface Statis {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsPerGenre: Record<string, number>; 
  songsPerArtist: Record<string, number>; 
  albumsPerArtist: Record<string, number>; 
}

