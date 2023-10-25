import { FC } from 'react';
import { Message } from '../utils/Message';

export const ChatBubble: FC<{
  message: Message;
}> = ({ message }) => {
  return (
    <div
      className={`p-2 rounded-lg my-2 ${
        message.type === 'user'
          ? 'bg-blue-200 ml-10 text-right'
          : message.type === 'assistant'
          ? 'bg-green-200 mr-10'
          : 'bg-red-200 mr-auto'
      }`}
    >
      <p>{message.content}</p>
    </div>
  );
};
