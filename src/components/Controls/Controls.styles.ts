import styled from "styled-components";

export const ControlWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: #333;
  padding: 0.625rem;
  font-size: 0.75rem;
  display: grid;
  grid-template-rows: 40px 1fr 80px;
`;

export const ControlHeader = styled.div`
  display: grid;
  grid-template-columns: auto 1fr min-content;
  grid-gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #8f5fe8;
  padding-bottom: 0.25rem;
  margin-bottom: 0.5rem;
`;

export const Title = styled.h1`
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
`;

export const ControlTaskListWrapper = styled.div`
  height: calc(100% - 30px);
  overflow-x: hidden !important;
  overflow-y: scroll !important;
  padding-right: 0.625rem;
  margin-top: 10px;

  ::-webkit-scrollbar {
    width: 0.625rem;
    height: 10px;
    background-color: #424242;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #686868;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #888;
  }
`;

export const ControlTask = styled.li`
  display: grid;
  grid-template-columns: 2rem 1fr 2rem 2rem;
  grid-gap: 0.25rem;
  padding: 0.5rem 0;
  border-bottom: 0.0625rem dashed #0090e7;
  align-items: center;
`;

export const TaskIconWrapper = styled.div`
  cursor: pointer;
  :hover {
    * {
      color: #fc424a;
    }
  }
`;

export const Button = styled.button`
  border: none;
  background: #8f5fe8;
  cursor: pointer;
  color: #fff;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;

export const TextArea = styled.textarea`
  background: #333;
  color: #fff;
  border: 0.0625rem dashed #8f5fe8;
  font-size: 1rem;
  padding: 0.25rem;
  width: 100%;
  resize: none;
  outline: none;
`;
