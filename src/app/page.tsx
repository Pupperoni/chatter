import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      Welcome to Home Main!
      <Link href="/login">Go to login</Link>
    </main>
  )
}
