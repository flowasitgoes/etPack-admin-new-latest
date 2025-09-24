"use client"

import { User } from "lucide-react"

export default function UserProfile() {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative mb-4">
        <a href="/employee-info" className="block">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center hover:opacity-80 transition-opacity">
            <User className="w-10 h-10 text-white" />
          </div>
        </a>
      </div>
      <h3 className="font-medium text-gray-800">陳某某</h3>
    </div>
  )
}
