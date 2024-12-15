import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    max-width: 700px;
  }
`;

export const Header = styled.h5`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 15px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const DropdownList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  margin-bottom: 10px;
`;

export const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #f1f1f1;

  &:hover {
    background-color: #e9ecef;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const NoResultsMessage = styled.p`
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 10px;
`;

export const SelectedPort = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

export const LanguageSwitcher = styled.select`
  margin-bottom: 20px;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;
