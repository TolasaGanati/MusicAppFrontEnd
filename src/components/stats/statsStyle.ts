import styled from "@emotion/styled";

export const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 90%;
  max-width: 1000px;
  height: auto; 
  max-height: 60vh; 
  position: fixed;
  right: 50; 
  top: 65%; 
  background-color: #f8f9fa; 
  border-radius: 10px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  color: #212529; 
  font-family: "Arial", sans-serif;
  z-index: 1000; 
`;

export const Header = styled.h2`
  margin: 0;
  padding-bottom: 15px;
  border-bottom: 3px solid #28a745; 
  color: #343a40;
  font-size: 1.8em;
  font-weight: bold;
`;

export const StatItem = styled.div`
  margin: 10px 0;
  padding: 15px;
  width: 100%;
  border-bottom: 1px solid #e9ecef; 
  background-color: #ffffff;
  color: #495057; 
  font-size: 1.1em;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s, transform 0.3s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #e9ecef; 
    transform: scale(1.02); 
  }
`;

export const SubStatItem = styled.div`
  margin: 5px 0;
  padding: 8px;
  color: #6c757d; 
  font-size: 0.95em;
  border-left: 3px solid #007bff; 
  padding-left: 10px;
`;

export const StatGroup = styled.div`
  margin: 10px 0;
  padding: 10px;
  background-color: #e9ecef; 
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const GroupHeader = styled.h3`
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #007bff; 
  font-size: 1.4em;
  color: #007bff;
`;
