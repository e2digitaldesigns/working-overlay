import styled from "styled-components";

interface ISettingsDrawerWrapperProps {
  isOpen: boolean;
}

export const SettingsDrawerWrapper = styled.div<ISettingsDrawerWrapperProps>`
  position: absolute;
  top: 0;
  right: ${props => (props.isOpen ? "0" : "-100vw")};
  z-index: 9999;

  width: 100vw;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #232323;

  color: white;

  transition: right 0.5s ease-in-out;
  padding: 0.5rem 0.75rem;
`;

export const HeaderWrapperGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
`;

export const OptionsWrapperGridInner = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  border-top: 0.0625rem solid #3a3a3a;
  padding: 0.25rem 0 0.5rem 0.5rem;
  min-height: 3rem;
  align-items: center;

  &:last-child {
    border-bottom: 0.0625rem solid #3a3a3a;
  }

  select {
    width: 100%;
    height: 100%;
    background-color: #232323;
    color: #ddd;
    font-size: 0.875rem;
    border: none;
    outline: none;
    padding: 0 0.5rem;
    cursor: pointer;

    border-radius: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    option {
      border-radius: 0;
    }
  }
`;
