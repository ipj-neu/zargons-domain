"use client";

import SessionList from "@/components/console/SessionList";

export default function Console() {
  return (
    <div>
      <div className="flex justify-between p-4">
        <button className="rounded px-4 py-2 bg-sand hover:opacity-90">Join</button>
        <button className="rounded px-4 py-2 bg-sand hover:opacity-90">Create</button>
      </div>
      <div className="flex flex-col flex-1 m-5 h-[700px] bg-slate-100 rounded-lg">
        <SessionList />
      </div>
    </div>
  );
}
