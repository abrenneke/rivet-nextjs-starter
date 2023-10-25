import { FC } from 'react';
import { Message } from '../utils/Message';
import { ChatInput } from './ChatInput';
import { ChatArea } from './ChatArea';

export const ChatBox: FC<{
  working: boolean;
  messages: Message[];
  streamingMessage: string | undefined;
  onSubmit: (message: string) => void;
}> = ({ messages, streamingMessage, working, onSubmit }) => {
  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <ChatArea messages={messages} streamingMessage={streamingMessage} />
        <ChatInput working={working} onSubmit={onSubmit} />
      </div>
    </div>
  );
};
