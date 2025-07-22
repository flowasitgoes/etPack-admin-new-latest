"use client"

import { User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function StaffInfo() {
  return (
    <div className="admin-right-col-section w-64 bg-gray-50 p-6 shadow-[-4px_0_8px_rgba(0,0,0,0.1)]" style={{ position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
      <div className="flex flex-col h-full">
        <div className="space-y-6 flex-1">
          {/* Order Creator */}
          <div className="right-col-item text-center">
            <div className="bg-gray-200 px-4 py-2 border-br-bl-none rounded-lg mb-4 font-medium">製單</div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center mx-auto mb-2">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="text-sm font-medium">陳某某</div>
          </div>

          {/* Manager */}
          <div className="right-col-item text-center">
            <div className="bg-gray-200 px-4 py-2 border-br-bl-none rounded-lg mb-4 font-medium">經理</div>
            <div className="w-16 h-16 rounded-full bg-theme-gray flex items-center justify-center mx-auto mb-2">
              <User className="w-8 h-8 text-gray-500" />
            </div>
          </div>

          {/* General Manager */}
          <div className="right-col-item text-center">
            <div className="bg-gray-200 px-4 py-2 border-br-bl-none rounded-lg mb-4 font-medium">總經理</div>
            <div className="w-16 h-16 rounded-full bg-theme-gray flex items-center justify-center mx-auto mb-2">
              <User className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-auto pt-6">
          <Button className="w-full bg-primary-dark hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 text-white py-3 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            確認送出
          </Button>
        </div>
      </div>
    </div>
  )
} 