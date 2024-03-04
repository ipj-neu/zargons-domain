import Image from "next/image";
import Link from "next/link";
import logoPic from '../../public/images/logo.png'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center pt-20">
        <Image src={logoPic} width={600} alt="Pic of Logo" />
      </div>
      <div className="flex-grow"></div> 
      <nav className="flex justify-center items-center p-2">
        <Link href="/console" className="p-2 rounded bg-sand">
          Login
        </Link>
      </nav>
      <div className="flex-grow"></div> 
    </div>
  );
}
