import React, { useState } from "react";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "../../store/configureStore"; 
import {
  deleteSong,
  updateSong,
} from "../../features/songs/songsSlice/songsSlice";
import { Song } from "../../features/songs/songsSlice/songsSliceType";
import {
  Container,
  Header,
  SongItem,
  IconContainer,
  EditIcon,
  DeleteIcon,
  EditForm,
  FilterContainer,
  FilterInput,
} from "./songListStyle";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const useTypedDispatch = () => useDispatch<AppDispatch>();

interface SongListProps {
  song: Song[];
}

// eslint-disable-next-line no-empty-pattern
const SongList: React.FC<SongListProps> = ({}) => {
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [formData, setFormData] = useState<Partial<Song>>({});
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const dispatch = useTypedDispatch();
  const songs = useTypedSelector((state) => state.songs.songs);

  const handleEditSong = (songId: string) => {
    const songToEdit = songs.find((song) => song._id === songId);

    if (!songToEdit) {
      console.error(`Song with ID ${songId} not found.`);
      return;
    }

    setEditingSong(songToEdit);
    setFormData({
      title: songToEdit.title,
      artist: songToEdit.artist,
      album: songToEdit.album,
      genre: songToEdit.genre,
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingSong) return;

    const updatedSong: Song = {
      ...editingSong,
      ...(formData as Partial<Song>),
    };

    try {
      await dispatch(updateSong(updatedSong)).unwrap();
      alert("Song updated successfully!");
      setEditingSong(null);
    } catch (error) {
      console.error("Failed to update song:", error);
      alert("Failed to update song. Please try again.");
    }
  };

  const handleDeleteSong = async (songId: string) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this song?"
      );
      if (!confirmed) return;

      await dispatch(deleteSong(songId)).unwrap();
      alert("Song deleted successfully!");
    } catch (error) {
      console.error("Failed to delete song:", error);
      alert("Failed to delete song. Please try again.");
    }
  };

const filteredSongs =
  Array.isArray(songs) && selectedGenre
    ? songs.filter((song) =>
        song.genre.toLowerCase().includes(selectedGenre.toLowerCase())
      )
    : songs;

  return (
    <Container>
      <Header>Songs List</Header>
      <FilterContainer>
        <FilterInput
          type="text"
          placeholder="Filter by genre..."
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        />
      </FilterContainer>
      {editingSong && (
        <EditForm onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleFormChange}
            placeholder="Title"
          />
          <input
            type="text"
            name="artist"
            value={formData.artist || ""}
            onChange={handleFormChange}
            placeholder="Artist"
          />
          <input
            type="text"
            name="album"
            value={formData.album || ""}
            onChange={handleFormChange}
            placeholder="Album"
          />
          <input
            type="text"
            name="genre"
            value={formData.genre || ""}
            onChange={handleFormChange}
            placeholder="Genre"
          />
          <button type="submit">Save</button>
        </EditForm>
      )}
      {filteredSongs.length === 0 ? (
        <p>No songs available</p>
      ) : (
        filteredSongs.map(
          (song: Song) =>
            song._id ? ( 
              <SongItem key={song._id}>
                <h3>{song.title}</h3>
                <p>Artist: {song.artist}</p>
                <p>Album: {song.album}</p>
                <p>Genre: {song.genre}</p>
                <IconContainer>
                  <EditIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditSong(song._id!);
                    }}
                  />
                  <DeleteIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSong(song._id!);
                    }}
                  />
                </IconContainer>
              </SongItem>
            ) : null 
        )
      )}
    </Container>
  );
};

export default SongList;
