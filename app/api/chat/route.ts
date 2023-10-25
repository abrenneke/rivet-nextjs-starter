import * as Rivet from '@ironclad/rivet-node';
import { resolve } from 'node:path';

export async function POST(request: Request) {
  const body = await request.json();

  const chatMessages = body.messages.map(
    (message: any): Rivet.ChatMessage => ({
      type: message.type as 'user' | 'assistant',
      message: message.content as string,
      name: undefined,
      function_call: undefined,
    })
  );

  const project = await Rivet.loadProjectFromFile(
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
    openAiKey: process.env.OPENAI_API_KEY,
    openAiOrganization: process.env.OPENAI_ORGANIZATION_ID,
  });

  processor.run();

  return new Response(processor.streamNode('E83_3mc1qMmr1qd8qraUf'), {
    headers: {
      'content-type': 'text/event-stream; charset=utf-8',
    },
  });
}
