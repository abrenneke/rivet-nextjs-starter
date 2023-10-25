import { FC, useState } from 'react';
import { Message } from '../utils/Message';
import { ChatBox } from './ChatBox';
import { useSubmitMessage } from '../hooks/useSubmitMessage';

export const ChatApp: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [working, setWorking] = useState(false);

  const [streamingMessage, setStreamingMessage] = useState<
    string | undefined
  >();

  const handleSubmit = useSubmitMessage({
    setMessages,
    setWorking,
    setStreamingMessage,
    messages,
  });

  return (
    <ChatBox
      working={working}
      messages={messages}
      streamingMessage={streamingMessage}
      onSubmit={handleSubmit}
    />
  );
};
