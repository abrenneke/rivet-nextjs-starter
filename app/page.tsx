'use client';

import { RecoilRoot } from 'recoil';
import { ChatApp } from './components/ChatApp';

export default function Page() {
  return (
    <RecoilRoot>
      <ChatApp />
    </RecoilRoot>
  );
}
