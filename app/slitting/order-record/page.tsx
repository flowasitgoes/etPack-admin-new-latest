"use client"

import { useState, useEffect } from "react"
import { Calendar } from "lucide-react"
import SlittingOrderList from "../../components/slitting-order-list"
import SlittingSidebar from "../../components/slitting-sidebar"
import "../../../styles/admin-colors.css"
import "../../../styles/admin.css"

export default function OrderRecordPage() {
  const [currentDateTime] = useState(() => {
    const now = new Date()
    const year = now.getFullYear() - 1911 // 民國年
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${year}/${month}/${day} ${hours}:${minutes}`
  })

  const [pageOpacity, setPageOpacity] = useState(0)

  useEffect(() => {
    // 組件掛載後開始淡入
    setTimeout(() => setPageOpacity(1), 50)
  }, [])

  return (
    <div className="admin-container min-h-screen bg-gradient-to-br p-4">
      <div className="max-w-[1600px] mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex h-screen">
          {/* Left Sidebar */}
          <SlittingSidebar activeModule="order-record" />

          {/* Main Content */}
          <div className="middle-col-section flex-1 flex transition-all duration-300 ease-in-out overflow-hidden">
            <div 
              className="flex-1 transition-opacity duration-150 ease-in-out overflow-y-auto"
              style={{ 
                opacity: pageOpacity,
              }}
            >
              <div className="order-record-container space-y-6 transition-all duration-300 ease-in-out p-6">
                {/* Header */}
                <div className="flex justify-between items-center text-white p-4" style={{ background: 'rgb(135, 191, 141)' }}>
                  <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-bold">分條課</h1>
                    <span className="text-lg">訂製單記錄</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm">{currentDateTime}</span>
                  </div>
                </div>

                {/* Order List */}
                <SlittingOrderList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
