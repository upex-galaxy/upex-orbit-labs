"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

// const menuItems = [
//   { name: "Buttons", href: "/buttons" },
//   { name: "Dropdowns", href: "/dropdowns" },
//   { name: "Sliders", href: "/sliders" },
//   { name: "Forms", href: "/forms" },
//   { name: "Drag and Drop", href: "/drag-and-drop" },
//   { name: "Upload/Download", href: "/upload-download" },
//   { name: "Static Table", href: "/static-table" },
// ]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-[#020B2D] shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#00FFFF]">
          QA Practice
        </Link>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none focus:text-[#00FFFF]"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <nav className="container mx-auto px-4 py-4">
          {/* <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block py-2 text-white hover:text-[#00FFFF] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul> */}
        </nav>
      )}
    </header>
  )
}

