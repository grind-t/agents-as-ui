import { useCallback, useState } from "preact/hooks";
import type {
  AgentInputItem,
  AssistantMessageItem,
  RunStreamEvent,
} from "@openai/agents";
import { assistant, user } from "../utils/message.ts";
import { TextLineStream } from "@std/streams";
import { JsonParseStream } from "@std/json";

export function useAgent() {
  const [history, setHistory] = useState<AgentInputItem[]>([]);
  const [newItem, setNewItem] = useState<AgentInputItem>();

  const sendMessage = useCallback((message: string) => {
    const updatedHistory = [...history, user(message)];
    setHistory(updatedHistory);
    fetch("http://localhost:8000/agent", {
      method: "POST",
      body: JSON.stringify({ history: updatedHistory }),
    }).then(async (v) => {
      const stream = v.body!
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(new TextLineStream())
        .pipeThrough(new JsonParseStream()) as unknown as ReadableStream<
          RunStreamEvent
        >;

      for await (const chunk of stream) {
        if (chunk.type === "run_item_stream_event") {
          setHistory((v) => [...v, chunk.item.rawItem]);
          setNewItem(undefined);
          continue;
        }

        if (chunk.type === "raw_model_stream_event") {
          if (chunk.data.type === "output_text_delta") {
            const { delta } = chunk.data;

            setNewItem((v) => {
              const item = v as AssistantMessageItem | undefined;
              const currentText = item?.content.findLast((v) =>
                v.type === "output_text"
              )?.text ?? "";
              return assistant(currentText + delta);
            });
          }
        }
      }
    });
  }, [history]);

  return [history, newItem, sendMessage] as const;
}
