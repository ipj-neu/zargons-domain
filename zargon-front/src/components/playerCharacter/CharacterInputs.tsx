export default function CharacterInputs({
  type,
  name,
  value,
  className,
  onChange,
  rows,
}: {
  type: "input" | "textarea";
  name: string;
  value: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}) {
  return (
    <>
      {type === "input" ? (
        <input type="text" name={name} value={value} onChange={onChange} className={`rounded p-1 border-black border-2 ${className}`} />
      ) : (
        <textarea name={name} value={value} onChange={onChange} rows={rows || 3} className={`rounded p-1 border-black border-2 ${className}`} />
      )}
    </>
  );
}
