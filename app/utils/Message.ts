export type Message = {
  type: 'user' | 'assistant' | 'error';
  content: string;
};
