import { FC, useLayoutEffect, useRef, useState } from 'react';
import { Message } from '../utils/Message';
import { FiSettings } from 'react-icons/fi';
import { ChatSettings } from './ChatSettings';
import { ChatBubble } from './ChatBubble';

export const ChatArea: FC<{
  messages: Message[];
  streamingMessage: string | undefined;
}> = ({ messages, streamingMessage }) => {
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const [showSettings, setShowSettings] = useState(false);
  useLayoutEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [streamingMessage, messages]);

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="">
      <div className="">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold p-8 flex justify-between items-center">
          <div>Chatbot</div>
          <div>
            <FiSettings
              onClick={handleSettingsClick}
              className="cursor-pointer"
            />
          </div>
        </div>
        {showSettings && <ChatSettings />}
        <div
          ref={chatAreaRef}
          className="block mt-1 text-lg leading-tight font-medium text-black break-words overflow-y-auto h-96 p-4"
        >
          {messages.map((message, index) => (
            <ChatBubble key={index} message={message} />
          ))}
          {streamingMessage && (
            <div className="p-2 rounded-lg my-2 bg-green-200 mr-auto">
              <p>{streamingMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
