import { useState, useEffect, createContext, useContext, useCallback, useRef } from "react";
import { get } from "aws-amplify/api";

// set up types
type WebSocketMessage = {
  action: string;
  [key: string]: any;
};

type ActionCallback = (message: WebSocketMessage) => void;

type WebSocketContext = {
  subscribeToAction: (action: string, callback: ActionCallback) => () => void;
};

// set up context
const WebSocketContext = createContext<WebSocketContext>({
  subscribeToAction: () => () => {},
});

// set up provider
export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);
  const actionCallbacksRef = useRef<{ [key: string]: ActionCallback[] }>({});

  const subscribeToAction = useCallback((action: string, callback: ActionCallback) => {
    // set up subscription to action
    const currentCallbacks = actionCallbacksRef.current[action] || [];
    actionCallbacksRef.current[action] = [...currentCallbacks, callback];

    // return unsubscribe function
    return () => {
      const remainingCallbacks = actionCallbacksRef.current[action].filter((cb) => cb !== callback);
      if (remainingCallbacks.length > 0) {
        actionCallbacksRef.current[action] = remainingCallbacks;
      } else {
        delete actionCallbacksRef.current[action];
      }
    };
  }, []);

  // set up socket connection
  const connect = async () => {
    if (socket) {
      socket.close();
    }

    // TODO create endpoint and update with correct api info
    const { body } = await get({
      apiName: "",
      path: "/preflight",
    }).response;
    // TODO maybe find a better way to handle this
    const body_json = (await body.json()) as { tempPassword: string };
    if (!body_json.tempPassword) {
      console.error("Failed to get temp password");
      return;
    }

    // TODO update with correct api info
    const newSocket = new WebSocket(`wss://oi8yywbjl5.execute-api.us-east-1.amazonaws.com/dev?tempPassword=${body_json.tempPassword}`);

    newSocket.onopen = () => {
      console.log("WebSocket Connected");
      setSocket((prevSocket) => {
        if (prevSocket) {
          prevSocket.close(4004, "new-socket");
        }
        return newSocket;
      });
    };

    newSocket.onclose = (ev) => {
      console.log("WebSocket Disconnected");
      setSocket(undefined);
      if (ev.code !== 4004) {
        setTimeout(() => connect(), 500);
      }
    };
  };

  // connect to the socket on mount
  useEffect(() => {
    if (!socket) {
      connect();
    }
    // close the socket on unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const callbacks = actionCallbacksRef.current[message.action] || undefined;
        if (callbacks) {
          callbacks.forEach((cb) => cb(message));
        } else {
          console.log("No callbacks for action", message.action);
        }
      };
    } else if (!socket) {
      console.log("refreshing socket");
      connect();
    }
  }, [socket]);

  return <WebSocketContext.Provider value={{ subscribeToAction }}>{children}</WebSocketContext.Provider>;
};

export const useWebSocket = (action: string, callback: ActionCallback) => {
  const { subscribeToAction } = useContext(WebSocketContext);
  useEffect(() => subscribeToAction(action, callback), [subscribeToAction, action, callback]);
};
