import type { AgentInputItem } from "@openai/agents";
import { AssistantMessageBlock } from "./AssistantMessageBlock.tsx";
import { UserMessageBlock } from "./UserMessageBlock.tsx";
import { ReasoningBlock } from "./ReasoningBlock.tsx";
import { FunctionCallBlock } from "./FunctionCallBlock.tsx";
import { FunctionCallResultBlock } from "./FunctionCallResultBlock.tsx";

export type MessageBlockProps = {
  item: AgentInputItem;
};

export function MessageBlock({ item }: MessageBlockProps) {
  if (item.type === "message") {
    if (item.role === "user") {
      return <UserMessageBlock item={item} />;
    }

    if (item.role === "assistant") {
      return <AssistantMessageBlock item={item} />;
    }
  }

  if (item.type === "reasoning") {
    return <ReasoningBlock item={item} />;
  }

  if (item.type === "function_call") {
    return <FunctionCallBlock item={item} />;
  }

  if (item.type === "function_call_result") {
    return <FunctionCallResultBlock item={item} />;
  }

  return null;
}
