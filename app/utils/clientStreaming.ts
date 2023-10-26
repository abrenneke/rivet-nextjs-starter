import { EventSourceParserStream } from 'eventsource-parser/stream';

export async function* fetchJSONEventStream<T = unknown>(
  path: string,
  init?: RequestInit
): AsyncGenerator<{ event: string; data: T }> {
  const response = await fetch(path, {
    method: 'POST',
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
      ...init?.headers,
    },
  });

  if (response.status !== 200) {
    let errorMessage = `${response.status}: ${response.statusText}`;
    let cause: unknown = undefined;
    try {
      const { error, code } = await response.json();
      errorMessage = error;
      cause = { code };
    } catch (err) {}
    const err = new Error(errorMessage);
    err.cause = cause;
    throw err;
  }

  const reader = response.body
    ?.pipeThrough(new TextDecoderStream('utf-8'))
    .pipeThrough(new EventSourceParserStream())
    .getReader();

  if (!reader) {
    return;
  }

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    try {
      const payload = JSON.parse(value.data);

      yield { event: value.event!, data: payload };
    } catch (err) {
      console.error(err);
    }
  }
}
