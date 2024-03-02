import { Session } from "@/types";
import { MdDelete } from "react-icons/md";

export default function SessionItem({ session, selected, onDelete }: { session: Session; selected: boolean; onDelete: () => void }) {
  return (
    <div className={`flex flex-1 border-b-2 border-y-black p-4 ${selected && "bg-slate-200 justify-between"}`}>
      <p>{session.name}</p>
      {selected && <MdDelete onClick={onDelete} size={20} className=" hover:cursor-pointer" />}
    </div>
  );
}
