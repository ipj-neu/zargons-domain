import { Session } from "@/types";
import { MdDelete } from "react-icons/md";

export default function SessionItem({ session, selected, onDelete, index }: { session: Session; selected: boolean; onDelete: () => void, index: number }) {
  return (
    <div className={`flex flex-1 p-4 ${index % 2 === 0 ? '' : 'bg-slate-300'} ${selected && "border-2 border-black rounded-lg justify-between"}`}>
      <p>{session.name}</p>
      {selected && <MdDelete onClick={onDelete} size={20} className=" hover:cursor-pointer" />}
    </div>
  );
}
