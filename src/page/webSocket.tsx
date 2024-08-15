import { useContext, useEffect } from "react";
import { WebsocketContext } from "../providers/websocketProvider";

const Websoc = () => {
  const { val, subscribeToEvent, unsubscribeFromEvent, isReady } =
    useContext(WebsocketContext);

  useEffect(() => {
    if (isReady) {
      subscribeToEvent("SUBSCRIBE", "notice");
    }
    return () => {
      if (isReady) {
        unsubscribeFromEvent("notice");
      }
    };
  }, [isReady, subscribeToEvent, unsubscribeFromEvent]);

  useEffect(() => {
    console.log(val);
  }, [val]);

  return <div>{JSON.stringify(val)}</div>;
};

export default Websoc;
