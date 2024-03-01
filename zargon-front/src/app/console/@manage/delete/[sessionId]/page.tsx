"use client";

import SlotModal, { useCloseModal } from "@/components/Modal";
import { del } from "@aws-amplify/api";

export default function ConfirmDelete({ params }: { params: { sessionId: string } }) {
  const handleCloseModal = useCloseModal();

  const handleDelete = async () => {
    console.log("Deleting session:", params.sessionId);
    await del({
      apiName: "SessionAPI",
      path: `/session/${params.sessionId}`,
    }).response;
    handleCloseModal();
  };

  return (
    <SlotModal className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="mb-4">Are you sure you want to delete this session?</h3>
      <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg">
        Delete
      </button>
      <button onClick={handleCloseModal} className="bg-main-gray text-white px-4 py-2 rounded-lg ml-2">
        Cancel
      </button>
    </SlotModal>
  );
}
