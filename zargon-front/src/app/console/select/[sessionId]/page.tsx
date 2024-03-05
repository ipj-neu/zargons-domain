"use client";
import { useEffect, useCallback } from "react";
import { Session } from "@/types";
import { put, ApiError } from "aws-amplify/api";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function App({ params }: { params: { sessionId: string } }) {
  const [errorMessage, setErrorMessage] = useState(""); // State variable for the error message
  const router = useRouter();

  const selectHero = useCallback(
    async (heroName: string) => {
      try {
        const res = await put({
          apiName: "SessionAPI",
          path: `/session/${params.sessionId}/select`,
          options: { body: { hero: heroName } },
        }).response;

        setErrorMessage("");
        router.push(`/console/session/${params.sessionId}/${heroName}`);
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.response) {
            const { statusCode, headers, body } = error.response;
            if (statusCode === 409) {
              setErrorMessage("Hero already selected");
            }
          }
        }
        console.error("Error selecting hero", error);
      }
    },
    [params.sessionId]
  );

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center mt-4">Please select a hero</h1>
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="flex justify-center space-x-2 mb-4">
          <button type="submit" className="bg-sand text-black p-2 rounded-lg w-32 transition hover:bg-yellow-600" onClick={() => selectHero("Barbarian")}>
            Barbarian
          </button>
          <button type="submit" className="bg-sand text-black p-2 rounded-lg w-32 transition hover:bg-yellow-600" onClick={() => selectHero("Dwarf")}>
            Dwarf
          </button>
        </div>
        <div className="flex justify-center space-x-2">
          <button type="submit" className="bg-sand text-black p-2 rounded-lg w-32 transition hover:bg-yellow-600" onClick={() => selectHero("Elf")}>
            Elf
          </button>
          <button type="submit" className="bg-sand text-black p-2 rounded-lg w-32 transition hover:bg-yellow-600" onClick={() => selectHero("Wizard")}>
            Wizard
          </button>
        </div>
        {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>} {/* Display the error message */}
      </div>
    </div>
  );
}

export default App;
