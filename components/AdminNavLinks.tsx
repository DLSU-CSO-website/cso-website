"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminNavLinks({ name, link }: {
  name: string
  link: string
}) {
  const pathname = usePathname()
  const isActive = pathname === link

  return (
    <Link
      className={`p-2 transition ease-in duration-200 mx-1 ${isActive ? 'bg-green-800/90 text-white' : 'hover:bg-green-100'}`}
      href={link}
    >
      {name}
    </Link>
  )
}
