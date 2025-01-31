"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname() // Añadimos esto para obtener la ruta actual
  const menuRef = useRef<HTMLDivElement>(null)
  const { language, setLanguage, t, isLoading } = useLanguage()

  const isLoginPage = pathname === '/' // Verificamos si estamos en la página de login

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleLogout = () => {
    router.push("/")
  }

  const handleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en')
    setIsOpen(false)
  }

  if (isLoading) {
    return (
      <header className="bg-[#020B2D] shadow-md">
        <div className="container flex-1 px-4 py-4 flex flex-wrap justify-between items-center">
          <div className="text-xl sm:text-2xl font-bold text-[#00FFFF]">
            Loading...
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-[#020B2D] shadow-md">
      <div className="container flex-1 px-4 py-4 flex flex-wrap justify-between items-center">
        <span className="text-xl sm:text-2xl font-bold text-[#00FFFF]">
          {t('pages.headers.title')}
        </span>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 sm:p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-colors duration-200"
          >
            <Menu size={18} className="sm:w-5 sm:h-5" />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 sm:w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button
                  onClick={handleLanguage}
                  className="w-full text-left px-3 sm:px-4 py-2 text-sm sm:text-base text-white hover:bg-gray-700 transition-colors duration-200"
                >
                  {language === 'en' ? 'Español' : 'English'}
                </button>
                {!isLoginPage && ( // Solo mostramos el botón de logout si NO estamos en la página de login
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 sm:px-4 py-2 text-sm sm:text-base text-white hover:bg-gray-700 transition-colors duration-200"
                  >
                    {t('pages.headers.buttons.logout')}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}