import * as Rivet from '@ironclad/rivet-node';
import { resolve } from 'node:path';

export async function POST(request: Request) {
  const body = await request.json();

  const openAiKey = request.headers.get('openai-api-key');

  // You may specifiy an OPENAI_API_KEY environment variable to use as the default key in
  // your Vercel deployment environment variables (https://vercel.com/docs/environment-variables)
  const apiKeyToUse = openAiKey || process.env.OPENAI_API_KEY;

  if (!apiKeyToUse?.trim()) {
    return new Response('Missing OpenAI API Key', {
      status: 400,
    });
  }

  const chatMessages = body.messages.map(
    (message: any): Rivet.ChatMessage => ({
      type: message.type as 'user' | 'assistant',
      message: message.content as string,
      name: undefined,
      function_call: undefined,
    })
  );

  const project = await Rivet.loadProjectFromFile(
    // Resolve is necessary so that Vercel includes this file in the deployment
    resolve('./app/ExampleProject.rivet-project')
  );

  const processor = Rivet.createProcessor(project, {
    graph: 'Chatbot',
    inputs: {
      messages: {
        type: 'chat-message[]',
        value: chatMessages,
      },
    },
    openAiKey: apiKeyToUse,
  });

  processor.run();

  return new Response(processor.streamNode('E83_3mc1qMmr1qd8qraUf'), {
    headers: {
      'content-type': 'text/event-stream; charset=utf-8',
    },
  });
}
