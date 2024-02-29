import Link from "next/link";

export default function Home() {
  return (
    <div>
      <nav className="flex flex-1 justify-between p-2">
        <p>Zargon's Domain</p>
        <Link href="/console" className="p-2 rounded bg-sand">
          Login
        </Link>
      </nav>
      <div className="flex justify-center items-center h-52">
        <h1 className="text-3xl font-bold">Home Screen</h1>
      </div>
    </div>
  );
}
