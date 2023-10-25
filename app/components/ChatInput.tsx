import { FC, useState } from 'react';

export const ChatInput: FC<{
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
