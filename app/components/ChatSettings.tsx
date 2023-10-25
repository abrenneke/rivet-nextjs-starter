import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { openaiApiKeyState } from '../state/settings';

export const ChatSettings: FC = () => {
  const [apiKey, setApiKey] = useRecoilState(openaiApiKeyState);

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <label className="block text-sm font-medium text-gray-700">
        OpenAI API Key
      </label>
      <input
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </div>
  );
};
