import type { UserMessageItem } from "@openai/agents";

export type UserMessageBlockProps = {
  item: UserMessageItem;
};

export function UserMessageBlock({ item }: UserMessageBlockProps) {
  const text = typeof item.content === "string"
    ? item.content
    : item.content.find((v) => v.type === "input_text")?.text;
  return <div className="p-2 rounded">{item.role}: {text}</div>;
}
