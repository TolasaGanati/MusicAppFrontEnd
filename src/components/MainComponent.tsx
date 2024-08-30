import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/configureStore"; // Ensure AppDispatch is exported from your store
import {
  fetchSongs,
  fetchStats,
} from "../features/songs/songsSlice/songsSlice";
import SongList from "./songList/SongList";
import SongForm from "./songForm/SongForm";
import Modal from "./modal/Modal";

const MainComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use the typed dispatch
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchSongs());
    dispatch(fetchStats());
  }, [dispatch]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={handleOpenModal}>Create New Song</button>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <SongForm onClose={handleCloseModal} />
        </Modal>
      )}
      <SongList song={[]} />
    </div>
  );
};

export default MainComponent;
