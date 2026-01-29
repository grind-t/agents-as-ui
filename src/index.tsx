import { render } from "preact";
import { useCallback, useState } from "preact/hooks";
import { MessageInput } from "./components/MessageInput.tsx";
import { MessageBlock } from "./components/MessageBlock.tsx";
import type {
  AgentInputItem,
  AssistantMessageItem,
  UserMessageItem,
} from "@openai/agents";

const App = () => {
  const [thread, setThread] = useState<AgentInputItem[]>([]);
  const [nextItem, setNextItem] = useState<AgentInputItem>();

  const handleSubmit = useCallback((message: string) => {
    const userMessageItem: UserMessageItem = {
      type: "message",
      role: "user",
      content: message,
    };
    setThread((v) => [...v, userMessageItem]);

    fetch("http://localhost:8000/agent", {
      method: "POST",
      body: JSON.stringify({ message }),
    })
      .then(async (response) => {
        const decoder = new TextDecoder();
        const assistantMessage = {
          type: "message",
          role: "assistant",
          status: "in_progress",
          content: [{
            type: "output_text",
            text: "",
          }],
        } satisfies AssistantMessageItem;

        for await (const chunk of response.body!) {
          const text = decoder.decode(chunk);
          assistantMessage.content[0].text += text;
          setNextItem({
            ...assistantMessage,
            content: [{
              type: "output_text",
              text: assistantMessage.content[0].text,
            }],
          });
        }

        setThread((v) => [...v, assistantMessage]);
        setNextItem(undefined);
      });
  }, []);

  return (
    <div className="flex flex-col h-full">
      {thread.map((item, index) => <MessageBlock key={index} item={item} />)}
      {nextItem && <MessageBlock item={nextItem} />}
      <MessageInput
        onSubmit={handleSubmit}
      />
    </div>
  );
};

render(<App />, document.body);
