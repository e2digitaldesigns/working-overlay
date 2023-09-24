import React from "react";
import tmi from "tmi.js";
import { useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  ArrowRightCircle,
  Eye,
  EyeOff,
  MinusSquare,
  PlusSquare
} from "react-feather";

import * as Styled from "./ChatDock.styles";
import timeArray from "./timing.json";

type ChatMessage = {
  _id: string;
  senderId: string;
  broadcasterName: string;
  name: string;
  msg: string;
  url: string;
  fontColor: string | null;
};

const ChatDockTMI: React.FC = () => {
  const { uid } = useParams();
  const [showTime, setShowTime] = React.useState<number>(40000);
  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([]);
  const [messageQueue, setMessageQueue] = React.useState<ChatMessage[]>([]);
  const [templates, setTemplates] = React.useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = React.useState<string>("");
  const [twitchUsername, setTwitchUsername] = React.useState<string>("");

  const innerRef = React.useRef<HTMLDivElement>(null);
  const isHovering = React.useRef<boolean>(false);

  const STORAGE_KEYS = {
    MESSAGES: `@gtk/${uid}/chat-messages`,
    TEMPLATE: `@gtk/${uid}/chat-template`,
    TIMER: `@gtk/${uid}/chat-timer`
  };

  const BASE_API_URL = `${process.env.REACT_APP_PUSH_SERVICE}/api/v1/socket/manual/gtkChatDisplay`;

  React.useEffect(() => {
    const data = window.localStorage.getItem(STORAGE_KEYS.MESSAGES);
    const storedData = data && JSON.parse(data);
    if (storedData) {
      setChatMessages(storedData);
    }
  }, [STORAGE_KEYS.MESSAGES]);

  React.useEffect(() => {
    const data = window.localStorage.getItem(STORAGE_KEYS.TIMER);

    if (data) {
      setShowTime(Number(data));
    }
  }, [STORAGE_KEYS.TIMER]);

  React.useEffect(() => {
    if (!isHovering.current) {
      innerRef.current?.scrollTo(0, innerRef.current.scrollHeight);
    }

    chatMessages.length &&
      window.localStorage.setItem(
        STORAGE_KEYS.MESSAGES,
        JSON.stringify(chatMessages.slice(-20))
      );
  }, [chatMessages, STORAGE_KEYS.MESSAGES]);

  React.useEffect(() => {
    const fetchTemplates = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_REST_API}/templates`
      );

      if (data) {
        setTemplates(data);
        const storage = window.localStorage.getItem(STORAGE_KEYS.TEMPLATE);

        storage
          ? setSelectedTemplate(storage)
          : setSelectedTemplate(data[0]._id);
      }
    };

    fetchTemplates();
  }, [STORAGE_KEYS.TEMPLATE]);

  React.useEffect(() => {
    const client = new tmi.Client({
      channels: ["icon33"]
    });

    client.connect();

    client.on(
      "message",
      (channel: any, tags: any, message: string, self: boolean) => {
        console.clear();
        console.log(tags);
        setChatMessages(prev => [
          ...prev,
          {
            _id: uuidv4(),
            senderId: tags["user-id"],
            broadcasterName: channel.replace("#", ""),
            name: tags["display-name"],
            msg: message,
            url: "string",
            fontColor: tags.color
          }
        ]);
      }
    );

    return () => {
      client.disconnect();
    };
  }, []);

  const handleSelectTemplate = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedTemplate(e.target.value);
    window.localStorage.setItem(STORAGE_KEYS.TEMPLATE, e.target.value);
  };

  const handleAddToQueue = (message: ChatMessage): void => {
    const check = messageQueue.find(msg => msg._id === message._id);
    if (!check) setMessageQueue([...messageQueue, message]);
  };

  const handleRemoveFromQueue = (message: ChatMessage): void => {
    const newMessageQueue = messageQueue.filter(msg => msg._id !== message._id);
    setMessageQueue(newMessageQueue);
  };

  const parseMessage = (message: ChatMessage): string => {
    const action = "showChatMessage";

    const messageJson = JSON.stringify({
      ...message,
      fontColor: message?.fontColor
        ? message.fontColor.replace("#", "%23")
        : "",
      showTime
    });

    return `${BASE_API_URL}?tid=${selectedTemplate}&uid=${uid}&action=${action}&message=${messageJson}`;
  };

  const handleSendChatMessage = async () => {
    const message = messageQueue?.[0];
    if (!message) return;

    const newMessageQueue = messageQueue.slice(1);
    setMessageQueue(newMessageQueue);

    await axios.get(parseMessage(message));
  };

  const handleSendChatMessageNow = async (message: ChatMessage) => {
    await axios.get(parseMessage(message));
  };

  const handleHideChatMessage = async () => {
    const action = "hideChatMessage";
    const localLink = `${BASE_API_URL}?tid=${selectedTemplate}&uid=${uid}&action=${action}`;
    await axios.get(localLink);
  };

  const handleShowTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShowTime(Number(e.target.value));
    window.localStorage.setItem(STORAGE_KEYS.TIMER, e.target.value);
  };

  const chatMessagesFiltered = chatMessages.filter(
    str => str.msg.split(" ").length > 1
  );

  const setIsHovering = (value: boolean) => {
    isHovering.current = value;
  };

  if (!uid) return <div>uid not found</div>;

  return (
    <>
      <Styled.ChatDockWrapper>
        <Styled.SelectWrapper>
          <select value={selectedTemplate} onChange={handleSelectTemplate}>
            {templates.map(template => (
              <option key={template._id} value={template._id}>
                {template.name}
              </option>
            ))}
          </select>
        </Styled.SelectWrapper>

        <Styled.OptionWrapper>
          <Styled.Queue>
            Queue: &nbsp; <span>{messageQueue.length}</span>
          </Styled.Queue>

          <Styled.IconWrapper>
            <select value={showTime} onChange={handleShowTime}>
              {timeArray.map(time => (
                <option key={time.time} value={time.time}>
                  {time.name}
                </option>
              ))}
            </select>
          </Styled.IconWrapper>
          <Styled.IconWrapper>
            <Eye onClick={handleSendChatMessage} />
          </Styled.IconWrapper>
          <Styled.IconWrapper>
            <EyeOff onClick={handleHideChatMessage} />
          </Styled.IconWrapper>
        </Styled.OptionWrapper>

        <Styled.ChatMessageWrapper>
          <Styled.ChatMessageWrapperInner
            ref={innerRef}
            onMouseOver={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {chatMessagesFiltered.map(message => (
              <Styled.ChatMessageGrid key={message._id}>
                <div>
                  <Styled.ChatMessageName
                    color={message?.fontColor ? message.fontColor : ""}
                  >
                    {message.name}
                  </Styled.ChatMessageName>
                  : {message.msg}
                </div>

                <Styled.ChatMessagePlus>
                  <ArrowRightCircle
                    onClick={() => handleSendChatMessageNow(message)}
                  />
                </Styled.ChatMessagePlus>

                <Styled.ChatMessagePlus>
                  {messageQueue.find(msg => msg._id === message._id) ? (
                    <MinusSquare
                      onClick={() => handleRemoveFromQueue(message)}
                    />
                  ) : (
                    <PlusSquare onClick={() => handleAddToQueue(message)} />
                  )}
                </Styled.ChatMessagePlus>
              </Styled.ChatMessageGrid>
            ))}
          </Styled.ChatMessageWrapperInner>
        </Styled.ChatMessageWrapper>
      </Styled.ChatDockWrapper>
    </>
  );
};

export default ChatDockTMI;
