import { useRef, useState, useLayoutEffect } from "react";

const Socket = () => {
  const ws = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState("");
  //启动
  useLayoutEffect(() => {
    ws.current = new WebSocket("ws://192.168.1.71:10199/msg");

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
      ws.current?.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          event: "contract-kline",
          period: "15MIN",
          pairId: 56,
          token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJhY2NvdW50XCI6XCIyODI0MDU3NTQ2QHFxLmNvbVwiLFwiY2xpZW50XCI6XCJBUFBcIixcImlzQXV0aFwiOnRydWUsXCJ1c2VySWRcIjoxMDE2NDEsXCJ1c2VybmFtZVwiOlwiNTU1XCJ9IiwiaXNzIjoibGF6eWJlYXIiLCJleHAiOjE3MjE4MDk4NzYsImlhdCI6MTcyMTIwNTA3Nn0.slKVYQn0R1OgBFt1QqASmAbC3PNW-l9I1JpHbBWY3dUCAaB68RMLKadSmKzIaAIFHbfwjs8eo_EvOTJ5VnMfhQ",
          unit: "0.1",
          accountType: 1,
        })
      );
    };

    ws.current.onmessage = (e) => {
      console.log(JSON.parse(e.data));

      setMessage(e.data);
    };
    return () => {
      ws.current?.close();
    };
  }, [ws]);

  return (
    <div>
      <div>sokcet</div>
    </div>
  );
};

export default Socket;
