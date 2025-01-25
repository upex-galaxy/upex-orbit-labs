"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const data = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Developer" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Designer" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Manager" },
]

export default function StaticTablePage() {
  const [lastAction, setLastAction] = useState("")

  const handleRowClick = (id: number) => {
    setLastAction(`Row clicked: ${id}`)
  }

  const handleCellHover = (id: number, column: string) => {
    setLastAction(`Hovering over ${column} for row ${id}`)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-[#00FFFF]">Static Table</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} onClick={() => handleRowClick(row.id)} className="cursor-pointer">
              <TableCell onMouseEnter={() => handleCellHover(row.id, "Name")}>{row.name}</TableCell>
              <TableCell onMouseEnter={() => handleCellHover(row.id, "Email")}>{row.email}</TableCell>
              <TableCell onMouseEnter={() => handleCellHover(row.id, "Role")}>{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="text-center mt-4">Last action: {lastAction}</p>
    </div>
  )
}

