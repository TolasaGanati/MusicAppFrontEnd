import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { fetchStats } from "../../features/songs/songsSlice/songsSlice";
import {
  StatsContainer,
  Header,
  StatItem,
  SubStatItem,
  StatGroup,
  GroupHeader,
} from "./statsStyle";

const Stats: React.FC = () => {
  const dispatch = useDispatch();
  const stats = useSelector((state: RootState) => state.songs.stats);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  if (!stats) {
    return <StatsContainer>Loading stats...</StatsContainer>;
  }

  return (
    <StatsContainer>
      <Header>Statistics</Header>
      <StatGroup>
        <GroupHeader>General Statistics</GroupHeader>
        <StatItem>
          <span>Total Songs:</span>
          <span>{stats.totalSongs}</span>
        </StatItem>
        <StatItem>
          <span>Total Artists:</span>
          <span>{stats.totalArtists}</span>
        </StatItem>
        <StatItem>
          <span>Total Albums:</span>
          <span>{stats.totalAlbums}</span>
        </StatItem>
        <StatItem>
          <span>Total Genres:</span>
          <span>{stats.totalGenres}</span>
        </StatItem>
      </StatGroup>
      <StatGroup>
        <GroupHeader>Detailed Statistics</GroupHeader>
        <StatItem>
          <span>Songs per Genre:</span>
          <div>
            {Object.entries(stats.songsPerGenre).map(([genre, count]) => (
              <SubStatItem key={genre}>
                {genre}: {count}
              </SubStatItem>
            ))}
          </div>
        </StatItem>
        <StatItem>
          <span>Songs per Artist:</span>
          <div>
            {Object.entries(stats.songsPerArtist).map(([artist, count]) => (
              <SubStatItem key={artist}>
                {artist}: {count}
              </SubStatItem>
            ))}
          </div>
        </StatItem>
        <StatItem>
          <span>Albums per Artist:</span>
          <div>
            {Object.entries(stats.albumsPerArtist).map(([artist, count]) => (
              <SubStatItem key={artist}>
                {artist}: {count} albums
              </SubStatItem>
            ))}
          </div>
        </StatItem>
        <StatItem>
          <span>Songs per Album:</span>
          <div>
            {Object.entries(stats.songsPerAlbum).map(([album, count]) => (
              <SubStatItem key={album}>
                {album}: {count}
              </SubStatItem>
            ))}
          </div>
        </StatItem>
      </StatGroup>
    </StatsContainer>
  );
};

export default Stats;
