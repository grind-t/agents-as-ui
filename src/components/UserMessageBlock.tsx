import type { UserMessageItem } from "@openai/agents";

export type UserMessageBlockProps = {
  item: UserMessageItem;
};

export function UserMessageBlock({ item }: UserMessageBlockProps) {
  return <div className="p-2 rounded">{item.role}: {item.content}</div>;
}
