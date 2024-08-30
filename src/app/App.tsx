import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import { fetchSongs } from "../features/songs/songsSlice/songsSlice";
import store from "../store/configureStore";
import SongList from "../components/songList/SongList";
import SongForm from "../components/songForm/SongForm";
import Stats from "../components/stats/Stats";
import { Container, Header, ContentWrapper } from "./appStyle";

const App: React.FC = () => {
  const dispatch = useDispatch<typeof store.dispatch>(); 

  useEffect(() => {
    dispatch(fetchSongs()); 
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Container>
        <Header>Songs Crud App</Header>
        <ContentWrapper>
          <SongForm
            onClose={() => {
              console.log("Song form closed");
            }}
          />
          <SongList song={[]} />
          <Stats />
        </ContentWrapper>
      </Container>
    </Provider>
  );
};

export default App;
