"use client";
import { useEffect, useCallback } from "react";
import { Session } from "@/types";
import { put } from "aws-amplify/api";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaAngleRight } from "react-icons/fa";

function App() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Input Value:", inputValue);
  };

  const fetchUserSessions = useCallback(async () => {
    try {
      const res = await put({
        apiName: "SessionAPI",
        path: "/session/join",
        options: { body: { joinCode: inputValue } },
      }).response;

      const { sessionId } = (await res.body.json()) as { sessionId: string; name: string; unavailableHeroes: string[] };

      router.push(`/console/select/${sessionId}`);
    } catch (error) {
      console.error("Error fetching user sessions", error);
    }
  }, [inputValue]);

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <h1 className="text-2xl font-bold mb-4">Please insert join code</h1>
      <form className="flex items-center" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <input
            className="border-2 border-gray-200 p-2 rounded-lg"
            placeholder="Enter code"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="ml-2 bg-sand text-black p-2 rounded-lg transition duration-1000 hover:bg-yellow-600 hover:rotate-[360deg]" onClick={fetchUserSessions}>
            <FaAngleRight />
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
