import styled from "@emotion/styled";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  margin-bottom:30%;
  height: 80%;
  overflow-y: auto;
  background-color: #f0f4f8;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.h2`
  margin: 0;
  padding-bottom: 20px;
  text-align: center;
  width: 100%;
  border-bottom: 2px solid #007bff;
  color: #007bff;
  font-size: 1.5em;
`;

export const SongItem = styled.div`
  position: relative;
  margin: 6px 0;
  padding: 10px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  h3 {
    margin: 0;
    font-size: 1.2em;
    color: #333;
  }

  p {
    margin: 5px 0;
    color: #555;
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
  align-items: center;

  svg {
    cursor: pointer;
    font-size: 1.5em;
  }
`;

export const EditIcon = styled(FaEdit)`
  color: #007bff;
`;

export const DeleteIcon = styled(FaTrashAlt)`
  color: #dc3545;
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;

  input[type="text"] {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 16px;
  }

  button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const FilterContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
`;

export const FilterInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  width: 100%;
`;