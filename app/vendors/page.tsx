"use client"

export default function VendorsPage() {
  return (
    <div className="middle-col-outer-wrap flex-1">
      {/* Header */}
      <div className="bg-gray-600 text-white px-6 py-4 mb-6">
        <div className="flex items-center space-x-2 text-sm">
          <span>業務課</span>
          <span>{">"}</span>
          <span>廠商資訊</span>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">廠商資訊</h2>
          <p className="text-gray-500">此功能正在開發中...</p>
        </div>
      </div>
    </div>
  )
} 