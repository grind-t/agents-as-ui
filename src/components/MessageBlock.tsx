import type { AgentInputItem } from "@openai/agents";
import { AssistantMessageBlock } from "./AssistantMessageBlock.tsx";
import { UserMessageBlock } from "./UserMessageBlock.tsx";

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

  return null;
}
