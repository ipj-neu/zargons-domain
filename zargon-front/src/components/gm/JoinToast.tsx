import { useWebSocket } from "@/contexts/WebSocket";
import { useCallback, useState } from "react";
import { IoIosClose } from "react-icons/io";

export default function JoinToast() {
  const [hero, setHero] = useState("");

  const handleJoinSessionNotification = useCallback(({ action, hero }: { action: string; [key: string]: any }) => {
    console.log("Join Session Notification");
    setHero(hero);
  }, []);

  useWebSocket("sessionJoined", handleJoinSessionNotification);

  const handleCloseToast = useCallback(() => {
    setHero("");
  }, []);

  if (!hero) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 m-4 z-40">
      <div onClick={handleCloseToast} className="bg-sand shadow-md rounded-md p-4 flex items-center hover:bg-yellow-600">
        <p className="mr-1">{hero} has joined the session!</p>
        <IoIosClose size={30} />
      </div>
    </div>
  );
}
