import type { FunctionCallResultItem } from "@openai/agents";

export type FunctionCallResultBlockProps = {
  item: FunctionCallResultItem;
};

export function FunctionCallResultBlock(
  { item }: FunctionCallResultBlockProps,
) {
  return (
    <div className="p-2 rounded">
      {item.type}: {item.name} =&gt; {JSON.stringify(item.output)}
    </div>
  );
}
