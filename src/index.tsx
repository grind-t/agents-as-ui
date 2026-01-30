import { render } from "preact";
import { MessageInput } from "./components/MessageInput.tsx";
import { MessageBlock } from "./components/MessageBlock.tsx";
import { useAgent } from "./hooks/useAgent.ts";

const App = () => {
  const [history, newItem, sendMessage] = useAgent();

  return (
    <div className="flex flex-col h-full">
      {history.map((item, index) => <MessageBlock key={index} item={item} />)}
      {newItem && <MessageBlock item={newItem} />}
      <MessageInput
        onSubmit={sendMessage}
      />
    </div>
  );
};

render(<App />, document.body);
