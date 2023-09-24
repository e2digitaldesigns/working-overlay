import styled from "styled-components";

export const ChatRelayContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.95);
  color: #fff;

  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 18px;
  line-height: 28px;
`;

export const ChatRelayInnerContainer = styled.div`
  overflow: auto;
  height: 100%;

  ::-webkit-scrollbar {
    width: 0px;
    display: none;
  }

  ::-moz-scrollbar {
    width: 0px;
    display: none;
  }
`;

export const ChatMessage = styled.div`
  padding: 10px 16px;
  border-bottom: 1px solid #222;
`;

interface IChatMessageNameProps {
  color?: string;
}

export const ChatMessageName = styled.span<IChatMessageNameProps>`
  color: ${props => props.color || "#fff"};
  font-weight: 500;
`;
