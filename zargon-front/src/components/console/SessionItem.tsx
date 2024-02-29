import { Session } from "@/types";

export default function SessionItem({ session, selected }: { session: Session; selected: boolean }) {
  return (
    <div className={`flex border-y-2 border-y-black ${selected && "bg-slate-600"}`}>
      <p>{session.name}</p>
    </div>
  );
}
