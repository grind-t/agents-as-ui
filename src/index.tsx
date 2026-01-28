import { render } from "preact";
import { useEffect, useState } from "preact/hooks";

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/agent", {
      method: "POST",
      body: JSON.stringify({ message: "hello" }),
    })
      .then(async (response) => {
        const decoder = new TextDecoder();

        for await (const chunk of response.body!) {
          const text = decoder.decode(chunk);
          setMessage((v) => v + text);
        }
      });
  }, []);

  return (
    <div>
      <p className="underline">{message}</p>
    </div>
  );
};

render(<App />, document.body);
