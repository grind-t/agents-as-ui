import type { AssistantMessageItem } from "@openai/agents";

export type AssistantMessageBlockProps = {
  item: AssistantMessageItem;
};

export function AssistantMessageBlock(
  { item }: AssistantMessageBlockProps,
) {
  const text = item.content.filter((v) => v.type === "output_text").map((v) =>
    v.text
  ).join("\n");

  return (
    <div className="p-2 rounded">
      {item.role}: {text}
    </div>
  );
}
