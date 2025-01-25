"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ButtonsPage() {
  const [lastAction, setLastAction] = useState("")

  const handleClick = (action: string) => {
    setLastAction(action)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-[#00FFFF]">Buttons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Button
          variant="default"
          onClick={() => handleClick("Default button clicked")}
          onContextMenu={(e) => {
            e.preventDefault()
            handleClick("Default button right-clicked")
          }}
          onDoubleClick={() => handleClick("Default button double-clicked")}
          className="text-white"
        >
          Default Button
        </Button>
        <Button
          variant="destructive"
          onClick={() => handleClick("Destructive button clicked")}
          onContextMenu={(e) => {
            e.preventDefault()
            handleClick("Destructive button right-clicked")
          }}
          onDoubleClick={() => handleClick("Destructive button double-clicked")}
          className="text-white"
        >
          Destructive Button
        </Button>
        <Button
          variant="outline"
          onClick={() => handleClick("Outline button clicked")}
          onContextMenu={(e) => {
            e.preventDefault()
            handleClick("Outline button right-clicked")
          }}
          onDoubleClick={() => handleClick("Outline button double-clicked")}
          className="text-white hover:text-black"
        >
          Outline Button
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleClick("Secondary button clicked")}
          onContextMenu={(e) => {
            e.preventDefault()
            handleClick("Secondary button right-clicked")
          }}
          onDoubleClick={() => handleClick("Secondary button double-clicked")}
          className="text-white"
        >
          Secondary Button
        </Button>
        <Button
          variant="ghost"
          onClick={() => handleClick("Ghost button clicked")}
          onContextMenu={(e) => {
            e.preventDefault()
            handleClick("Ghost button right-clicked")
          }}
          onDoubleClick={() => handleClick("Ghost button double-clicked")}
          className="text-white hover:text-black"
        >
          Ghost Button
        </Button>
        <Button
          variant="link"
          onClick={() => handleClick("Link button clicked")}
          onContextMenu={(e) => {
            e.preventDefault()
            handleClick("Link button right-clicked")
          }}
          onDoubleClick={() => handleClick("Link button double-clicked")}
          className="text-[#00FFFF]"
        >
          Link Button
        </Button>
      </div>
      <p className="text-center mt-8">Last action: {lastAction}</p>
    </div>
  )
}

