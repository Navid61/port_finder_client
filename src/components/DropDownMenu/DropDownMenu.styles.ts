import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  border:1px solid gray;
`;

export const DropdownButton = styled.button`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
color:black;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  z-index: 10;
`;

export const DropdownItem = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #f1f1f1;

  &:hover {
    background-color: #e9ecef;
  }

  &:last-child {
    border-bottom: none;
  }

  label {
    display: flex;
    align-items: center;
    width: 100%;
  }

  input {
    margin-right: 10px;
  }
`;

export const NoResultsMessage = styled.p`
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 10px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 5px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;
