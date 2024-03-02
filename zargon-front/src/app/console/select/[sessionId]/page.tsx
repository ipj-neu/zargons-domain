"use client";
import { useEffect, useCallback } from "react";
import { Session } from "@/types";
import { put, ApiError } from "aws-amplify/api";
import React, { useState } from 'react';

function App({ params}: {params: { sessionId: string}}) {

    const [errorMessage, setErrorMessage] = useState(""); // State variable for the error message

    const selectHero = useCallback(async (heroName:string) => {
        try {
            const res = await put({
            apiName: "SessionAPI",
            path: `/session/${params.sessionId}/select`,
            options: {body:{hero: heroName}}
            }).response;

            setErrorMessage("")

            const body = await res.body.json()

        } catch (error) {
            
            if (error instanceof ApiError) {
                if (error.response) {
                    const {
                        statusCode,
                        headers,
                        body
                    } = error.response;
                    if (statusCode === 409) {
                        setErrorMessage("Hero already selected")
                    }
                }
                // Handle API errors not caused by HTTP response.
            }

            console.error("Error selecting hero", error);
        }
        }, [params.sessionId]);


    return (
        <div className="flex flex-col min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-center mt-4">Please select a hero</h1>
            <div className="flex flex-col items-center justify-center flex-grow">
                <div className="flex justify-center space-x-2 mb-4">
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-32" onClick={() => selectHero("Barbarian")}>Barbarian</button>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-32" onClick={() => selectHero("Dwarf")}>Dwarf</button>
                </div>
                <div className="flex justify-center space-x-2">
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-32" onClick={() => selectHero("Elf")}>Elf</button>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-32" onClick={() => selectHero("Wizard")}>Wizard</button>
                </div>
                {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>} {/* Display the error message */}
            </div>
        </div>
    );
}

export default App;