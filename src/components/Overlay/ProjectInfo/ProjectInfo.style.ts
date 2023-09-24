import styled from "styled-components";

export const ProjectInfoWrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 300px;
  left: 10px;
  z-index: 1000;
  width: 270px;
  height: 100px;
  padding: 10px;
  border-bottom: 1px dashed #0090e7;

  display: flex;
  flex-direction: column;
`;

export const Date = styled.div`
  font-size: 1.25rem;
  border-bottom: 1px dashed #8f5fe8;
  padding-bottom: 0.25rem;
  margin-bottom: 0.5rem;
`;

export const Project = styled.div`
  font-size: 1.25rem;
  margin-top: 0.5rem;

  span {
    color: #0090e7;
    font-size: 1.25rem;
  }
`;
