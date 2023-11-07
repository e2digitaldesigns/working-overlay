import styled from "styled-components";

export const TaskWrapper = styled.div`
  position: absolute;
  top: 430px;
  left: 10px;
  width: 270px;
  height: 620px;
  border-bottom: 2px solid #8f5fe8;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #8f5fe8;
  height: 40px;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 500;
  color: #fff;
`;

export const TaskCount = styled.h1`
  font-size: 1.25rem;
  font-weight: 500;
  color: #fff;
`;

export const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
`;

export const Task = styled.li`
  display: grid;
  grid-template-columns: 2rem 1fr;
  padding: 0.25rem 0;
  border-bottom: 0.0625rem dashed #0090e7;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;

  > svg {
    padding: 0;
    margin: 0;
    border: 0;
  }
`;

export const TaskText = styled.div`
  display: flex;
  align-items: center;
`;
