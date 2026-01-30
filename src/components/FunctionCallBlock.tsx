import type { FunctionCallItem } from "@openai/agents";

export type FunctionCallBlockProps = {
  item: FunctionCallItem;
};

export function FunctionCallBlock(
  { item }: FunctionCallBlockProps,
) {
  return (
    <div className="p-2 rounded">
      {item.type}: {item.name}({item.arguments})
    </div>
  );
}
