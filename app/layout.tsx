import "./globals.css"
import { Inter } from "next/font/google"
import Header from "./components/Header"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "QA Practice Site",
  description: "Practice site for Software QA Automation Engineers",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-b from-[#020B2D] via-[#1E0B4A] to-[#0A3A7E] text-white min-h-screen`}
      >
        <Header />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  )
}

