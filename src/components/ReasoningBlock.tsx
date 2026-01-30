import type { ReasoningItem } from "@openai/agents";

export type ReasoningBlockProps = {
  item: ReasoningItem;
};

export function ReasoningBlock(
  { item }: ReasoningBlockProps,
) {
  const text = item.content.map((v) => v.text).join("\n");
  return (
    <div className="p-2 rounded">
      {item.type}: {text}
    </div>
  );
}
