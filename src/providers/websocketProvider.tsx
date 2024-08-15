import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ISubscribe,
  KlineMessage,
  NoticeMessage,
  TradeMessage,
} from "../types/websocket";

export const WebsocketContext = createContext<ISubscribe>({
  isReady: false,
  val: null,
  val2: null,
  val3: null,
  subscribeToEvent: () => {},
  unsubscribeFromEvent: () => {},
});

export const WebsocketProvider = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState(false);
  const [val, setVal] = useState<NoticeMessage | null>(null); //山丘之王
  const [val2, setVal2] = useState<TradeMessage | null>(null); //最新交易数据
  const [val3, setVal3] = useState<KlineMessage | null>(null); //最新k线数据

  const ws = useRef<WebSocket | null>(null);

  const handleWebSocketMessage = useCallback((event: MessageEvent) => {
    const message = JSON.parse(event.data);
    switch (message.event) {
      case "crown":
        setVal((prevVal) => ({ ...prevVal, ...message }));
        break;
      case "trade":
        setVal2((prevVal) => ({ ...prevVal, ...message }));
        break;
      case "kline":
        setVal3((prevVal) => ({ ...prevVal, ...message }));
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.1.60:10199/msg");

    socket.onopen = () => setIsReady(true);
    socket.onclose = () => setIsReady(false);
    socket.onmessage = handleWebSocketMessage;

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, [handleWebSocketMessage]);

  const sendMessage = useCallback((message: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    }
  }, []);

  const subscribeToEvent = useCallback(
    (
      method: string,
      event: "notice" | "kline",
      tokenId?: string,
      period?: string
    ) => {
      const subscriptionMessage = JSON.stringify({
        method,
        event,
        tokenId,
        period,
      });
      sendMessage(subscriptionMessage);
    },
    [sendMessage]
  );

  const unsubscribeFromEvent = useCallback(
    (event: "notice" | "kline") => {
      const unsubscriptionMessage = JSON.stringify({
        method: "UNSUBSCRIBE",
        event,
      });
      sendMessage(unsubscriptionMessage);
    },
    [sendMessage]
  );

  return (
    <WebsocketContext.Provider
      value={{
        isReady,
        val,
        val2,
        val3,
        subscribeToEvent,
        unsubscribeFromEvent,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};
