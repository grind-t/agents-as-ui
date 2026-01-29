import type { AssistantMessageItem } from "@openai/agents";

export type AssistantMessageBlockProps = {
  item: AssistantMessageItem;
};

export function AssistantMessageBlock(
  { item }: AssistantMessageBlockProps,
) {
  return (
    <div className="p-2 rounded">
      {item.role}:{" "}
      {item.content[0].type === "output_text" ? item.content[0].text : null}
    </div>
  );
}
