import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <div className="mb-3">Welcome to Chatter!</div>
        <div>
          <Link className="mt-4 w-full bg-sky-500 rounded p-2 text-white" href="/home">Home</Link>
        </div>
      </div>
    </main>
  )
}
