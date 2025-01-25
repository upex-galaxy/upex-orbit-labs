"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"

export default function SlidersPage() {
  const [value, setValue] = useState(50)
  const [lastAction, setLastAction] = useState("")

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue[0])
    setLastAction(`Slider value changed to ${newValue[0]}`)
  }

  const handleSliderClick = () => {
    setLastAction("Slider clicked")
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-[#00FFFF]">Sliders</h1>
      <div className="max-w-xs mx-auto">
        <Slider
          value={[value]}
          onValueChange={handleValueChange}
          onClick={handleSliderClick}
          max={100}
          step={1}
          className="cursor-pointer"
        />
        <p className="mt-4 text-center">Slider value: {value}</p>
        <p className="mt-2 text-center">Last action: {lastAction}</p>
      </div>
    </div>
  )
}

