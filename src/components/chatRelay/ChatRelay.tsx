import React from "react";
import socketServices from "../../services/socketServices";
import * as Styled from "./ChatRelay.styles";

type ChatMessage = {
  broadcasterName: string;
  name: string;
  msg: string;
  url: string;
  fontColor: string;
};

const STORAGE_KEY = "@gtk/chat-messages";

const ChatRelay: React.FC = () => {
  const queryParams = React.useMemo(() => {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams;
  }, []);

  const viewer = queryParams.get("viewer");
  const innerRef = React.useRef<HTMLDivElement>(null);

  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([]);

  React.useEffect(() => {
    const data = window.localStorage.getItem(STORAGE_KEY);
    const storedData = data && JSON.parse(data);
    if (storedData) {
      setChatMessages(storedData);
    }
  }, []);

  React.useEffect(() => {
    let stillHere = true;

    socketServices.subscribeApplicationActions(
      (err: unknown, data: ChatMessage) => {
        console.log(data);
        if (data?.broadcasterName !== queryParams.get("s")) return;
        stillHere && setChatMessages(prev => [...prev, data]);
      }
    );

    return () => {
      stillHere = false;
      socketServices.unSubscribeApplicationActions();
    };
  }, [queryParams]);

  React.useEffect(() => {
    innerRef.current?.scrollTo(0, innerRef.current.scrollHeight);

    chatMessages.length &&
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(chatMessages.slice(-20))
      );
  }, [chatMessages]);

  if (viewer !== "chat") return null;

  return (
    <Styled.ChatRelayContainer>
      <Styled.ChatRelayInnerContainer ref={innerRef}>
        {chatMessages.map((chatMessage, index) => (
          <Styled.ChatMessage key={index}>
            <Styled.ChatMessageName color={chatMessage.fontColor}>
              {chatMessage.name}: &nbsp;
            </Styled.ChatMessageName>
            <span>{chatMessage.msg}</span>
          </Styled.ChatMessage>
        ))}
      </Styled.ChatRelayInnerContainer>
    </Styled.ChatRelayContainer>
  );
};

export default ChatRelay;
