import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addSong } from "../../features/songs/songsSlice/songsSlice";
import Modal from "../modal/Modal";
import { Container, Form, Input, Button, CancelButton } from "./songFormStyle";

interface SongFormProps {
  onClose: () => void; // Define onClose prop
}

const SongForm: React.FC<SongFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [showCreateSongModal, setShowCreateSongModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title && artist && album && genre) {
      try {
        const response = await axios.post("/api/songs", {
          title,
          artist,
          album,
          genre,
        });

        console.log("Song added successfully:", response.data);
        dispatch(addSong(response.data));

        alert("Song added successfully!");

        setTitle("");
        setArtist("");
        setAlbum("");
        setGenre("");
        setShowCreateSongModal(false);
        onClose(); // Call onClose when done
      } catch (error) {
        console.error("Error adding song:", error);
      }
    } else {
      console.warn("Please fill out all fields.");
    }
  };

  return (
    <Container>
      <Button
        type="button"
        onClick={() => {
          setShowCreateSongModal(true);
        }}
      >
        Create New Song
      </Button>

      {showCreateSongModal && (
        <Modal onClose={() => setShowCreateSongModal(false)}>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Album"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <Button type="submit">Add the Song</Button>
            <CancelButton
              type="button"
              onClick={() => {
                setShowCreateSongModal(false);
              }}
            >
              Cancel
            </CancelButton>
          </Form>
        </Modal>
      )}
    </Container>
  );
};

export default SongForm;
