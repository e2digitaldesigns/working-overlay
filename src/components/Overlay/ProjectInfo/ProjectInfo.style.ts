import styled from "styled-components";

export const ProjectInfoWrapper = styled.div`
  position: absolute;
  top: 300px;
  left: 10px;
  width: 270px;
  height: 70px;
  z-index: 1000;
  border-bottom: 1px dashed #0090e7;
  overflow: hidden;

  display: grid;
  grid-template-rows: 30px 40px;

  > div {
    display: flex;
    align-items: center;
    height: 100%;
  }
`;

export const Date = styled.div`
  font-size: 1.25rem;
  border-bottom: 1px dashed #8f5fe8;
`;

export const Project = styled.div`
  font-size: 1.25rem;

  span {
    color: #0090e7;
    font-size: 1.25rem;
  }
`;
