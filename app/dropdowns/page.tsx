"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DropdownsPage() {
  const [value, setValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [lastAction, setLastAction] = useState("")

  const handleValueChange = (newValue: string) => {
    setValue(newValue)
    setLastAction(`Option selected: ${newValue}`)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    setLastAction(open ? "Dropdown opened" : "Dropdown closed")
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-[#00FFFF]">Dropdowns</h1>
      <div className="max-w-xs mx-auto">
        <Select value={value} onValueChange={handleValueChange} onOpenChange={handleOpenChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
        <p className="mt-4 text-center">Selected value: {value}</p>
        <p className="mt-2 text-center">Dropdown is {isOpen ? "open" : "closed"}</p>
        <p className="mt-2 text-center">Last action: {lastAction}</p>
      </div>
    </div>
  )
}

