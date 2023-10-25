import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const openaiApiKeyState = atom({
  key: 'openaiApiKey',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
