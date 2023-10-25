'use client';

import { FC, useLayoutEffect, useRef, useState } from 'react';
import { fetchTextStream } from './clientStreaming';

export default function Page() {
  return <ChatApp />;
}

type Message = {
  type: 'user' | 'assistant';
  content: string;
};

const ChatApp: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [working, setWorking] = useState(false);

  const [streamingMessage, setStreamingMessage] = useState<
    string | undefined
  >();

  const handleSubmit = async (message: string) => {
    setWorking(true);

    const userMessage = { type: 'user', content: message } as const;
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);

    const chunks = fetchTextStream('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: newMessages }),
    });

    let completeMessage = '';
    for await (const chunk of chunks) {
      completeMessage += chunk;
      setStreamingMessage(completeMessage);
    }

    setMessages((messages) => [
      ...messages,
      { type: 'assistant', content: completeMessage },
    ]);
    setStreamingMessage(undefined);

    setWorking(false);
  };

  return (
    <ChatBox
      working={working}
      messages={messages}
      streamingMessage={streamingMessage}
      onSubmit={handleSubmit}
    />
  );
};

const ChatBox: FC<{
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

const ChatArea: FC<{
  messages: Message[];
  streamingMessage: string | undefined;
}> = ({ messages, streamingMessage }) => {
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [streamingMessage, messages]);

  return (
    <div className="">
      <div className="">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold p-8">
          Chatbot
        </div>
        <div
          ref={chatAreaRef}
          className="block mt-1 text-lg leading-tight font-medium text-black break-words overflow-y-auto h-96 p-4"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg my-2 ${
                message.type === 'user'
                  ? 'bg-blue-200 ml-10 text-right'
                  : 'bg-green-200 mr-10'
              }`}
            >
              <p>{message.content}</p>
            </div>
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

const ChatInput: FC<{
  working: boolean;
  onSubmit: (message: string) => void;
}> = ({ working, onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    onSubmit(message);
    setMessage('');
  };

  return (
    <div className="border-t-2 border-gray-200 py-2 sm:px-6">
      <div className="flex">
        <input
          autoFocus
          disabled={working}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="text"
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        <button
          disabled={working}
          className="ml-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => handleSubmit()}
        >
          Send
        </button>
      </div>
    </div>
  );
};
