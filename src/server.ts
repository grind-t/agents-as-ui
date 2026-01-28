import { serveDir } from "@std/http/file-server";
import { join } from "@std/path";
import { Agent, run } from "@openai/agents";

const AGENT_ROUTE = new URLPattern({ pathname: "/agent" });

const agent = new Agent({
  name: "History Tutor",
  instructions:
    "You provide assistance with historical queries. Explain important events and context clearly.",
});

async function handler(req: Request): Promise<Response> {
  if (AGENT_ROUTE.test(req.url)) {
    const body = await req.json();
    const result = await run(agent, body.message, { stream: true });
    const stream = result.toTextStream() as ReadableStream<string>;
    const byteStream = stream.pipeThrough(new TextEncoderStream());

    return new Response(byteStream, {
      headers: {
        "content-type": "text/plain",
        "x-content-type-options": "nosniff",
      },
    });
  }

  return serveDir(req, {
    fsRoot: join(import.meta.dirname!, "..", "dist"),
    enableCors: true,
  });
}

Deno.serve(handler);
