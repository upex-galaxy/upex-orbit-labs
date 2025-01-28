"use client"

import { useState } from "react"
import Button from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function FormsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    agreeTerms: false,
  })
  const [lastAction, setLastAction] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setLastAction(`Input ${name} changed to: ${value}`)
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }))
    setLastAction(`Checkbox changed to: ${checked}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLastAction("Form submitted")
    console.log("Form data:", formData)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-[#00FFFF]">Forms</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="agreeTerms" checked={formData.agreeTerms} onCheckedChange={handleCheckboxChange} />
          <Label htmlFor="agreeTerms">I agree to the terms and conditions</Label>
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
      <p className="text-center mt-4">Last action: {lastAction}</p>
    </div>
  )
}

