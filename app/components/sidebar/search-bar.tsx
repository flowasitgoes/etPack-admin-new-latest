"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function SearchBar() {
  return (
    <div className="relative mb-6">
      <Input placeholder="搜尋..." className="pl-10 border-gray-300" />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
    </div>
  )
}
