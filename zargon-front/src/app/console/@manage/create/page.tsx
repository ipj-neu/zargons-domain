"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { post } from "@aws-amplify/api";
import { useRouter } from "next/navigation";
import SlotModal, { useCloseModal } from "@/components/Modal";

export default function CreateModal() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCloseModal = useCloseModal();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log("Submitted value:", inputValue);
    await post({
      apiName: "SessionAPI",
      path: "/session",
      options: {
        body: {
          name: inputValue,
        },
      },
    }).response;
    handleCloseModal();
  };

  return (
    <SlotModal className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Create Session</h2>
      <input
        type="text"
        value={inputValue}
        placeholder="Enter session name"
        onChange={handleInputChange}
        className="border border-gray-300 rounded-lg p-2 mb-2"
        disabled={loading}
      />
      <button onClick={handleSubmit} className="bg-sand text-white px-4 py-2 rounded-lg ml-2" disabled={loading || inputValue === ""}>
        Submit
      </button>
    </SlotModal>
  );
}
