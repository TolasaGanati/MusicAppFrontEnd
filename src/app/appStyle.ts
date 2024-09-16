import styled from "@emotion/styled";

export const Container = styled.div`
  text-align: center;
  padding: 20px;
  background-image: url("https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.h1`
  margin: 0;
  padding: 10px 0;
  color: #2081d1;
  font-size: 2.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
`;

export const ContentWrapper = styled.div`
  width: 90%; 
  max-width: 90%; 
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 20px;
  height: 80vh; 
`;

export const SongListContainer = styled.div`
  flex: 2;
  background-color: #f0f4f8;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

export const StatsContainer = styled.div`
  flex: 1;
  background-color: #f0f4f8;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;
