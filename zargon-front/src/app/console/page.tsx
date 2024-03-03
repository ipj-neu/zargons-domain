import SessionList from "@/components/console/SessionList";
import Link from "next/link";

export default function Console() {
  return (
    <div>
      <div className="flex justify-between p-4">
        <Link href="/console/join" className="rounded px-4 py-2 bg-sand hover:opacity-90">
          Join
        </Link>
        <Link href="/console/create" className="rounded px-4 py-2 bg-sand hover:opacity-90">
          Create
        </Link>
      </div>
      <div className="flex flex-col flex-1 m-5 h-[700px] bg-slate-100 rounded-lg">
        <SessionList />
      </div>
    </div>
  );
}
