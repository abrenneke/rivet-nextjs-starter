import * as Rivet from '@ironclad/rivet-node';

export default async function Home() {
  const project = await Rivet.loadProjectFromFile(
    '/Users/andy.brenneke/Desktop/Integration Test.rivet-project'
  );
  const processor = Rivet.createProcessor(project, {
    graph: 'Graph 1',
    inputs: {
      input: 'Hello how are you?',
    },
    openAiKey: process.env.OPENAI_API_KEY,
    openAiOrganization: process.env.OPENAI_ORGANIZATION_ID,
  });
  const outputs = await processor.run();
  return <main>{JSON.stringify(outputs)}</main>;
}
