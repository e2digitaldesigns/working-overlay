import React from "react";
import * as Styled from "./SettingsDrawer.style";

import { XCircle, ToggleLeft, ToggleRight } from "react-feather";

interface SettingsDrawerProps {
  handleClearChat: () => void;
  handleSettingsClose: () => void;
  isOpen: boolean;

  showSingleWordMessages: boolean;
  handleSingleWordMessage: () => void;

  transition: string;
  handleTransition: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const transitions = [
  { name: "Template Default", value: "" },
  { name: "Left to Right", value: "LeftToRight" },
  { name: "Rigth to Left", value: "RightToLeft" },
  { name: "Top to Bottom", value: "TopToBottom" },
  { name: "Bottom to Top", value: "BottomToTop" },
  { name: "Fade In", value: "FadeIn" },
  { name: "Scale In", value: "ScaleIn" }
];

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  handleClearChat,
  handleSettingsClose,
  isOpen,
  showSingleWordMessages,
  handleSingleWordMessage,
  transition,
  handleTransition
}) => {
  return (
    <>
      <Styled.SettingsDrawerWrapper isOpen={isOpen}>
        <Styled.HeaderWrapperGrid>
          <XCircle onClick={handleSettingsClose} />
          <h3>Settings</h3>
        </Styled.HeaderWrapperGrid>

        <Styled.OptionsWrapperGridInner>
          <div>Show single word messages:</div>
          <div>
            {showSingleWordMessages ? (
              <ToggleRight onClick={handleSingleWordMessage} />
            ) : (
              <ToggleLeft onClick={handleSingleWordMessage} />
            )}
          </div>
        </Styled.OptionsWrapperGridInner>

        <Styled.OptionsWrapperGridInner>
          <div>Transition:</div>
          <div>
            <select value={transition} onChange={handleTransition}>
              {transitions.map(transition => (
                <option key={transition.value} value={transition.value}>
                  {transition.name}
                </option>
              ))}
            </select>
          </div>
        </Styled.OptionsWrapperGridInner>

        <Styled.OptionsWrapperGridInner>
          <div>Clear Chat</div>
          <div>
            <button onClick={handleClearChat}>Clear</button>
          </div>
        </Styled.OptionsWrapperGridInner>
      </Styled.SettingsDrawerWrapper>
    </>
  );
};
