import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  padding: 20px;
  height: auto; 
  max-height: 200px;
`;

export const Form = styled.form`
  margin: 20px 0;
  margin-top: -10px;
  display: flex;
  flex-direction: column;
  gap: 0px;
  width: 100%;
  max-width: 400px;
  
`;

export const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom:24px;
`;

export const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:first-of-type {
    margin-bottom: 10px;
    margin-top: -20px;
  }
`;
export const CancelButton = styled(Button)`
  background-color: #dc3545; 
  &:hover {
    background-color: #c82333; 
  }
`;