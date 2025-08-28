"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function MaterialRecordPage() {
  const [currentDateTime] = useState(() => {
    const now = new Date()
    const year = now.getFullYear() - 1911 // 民國年
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${year}/${month}/${day} ${hours}:${minutes}`
  })

  // 領料單記錄數據
  const materialRecords = [
    {
      orderNumber: "K01140626001",
      slipNumber: "241950",
      materials: [
        { name: "", quantity: "" },
        { name: "", quantity: "" }
      ],
      requester: ""
    },
    {
      orderNumber: "K01140621001", 
      slipNumber: "241949",
      materials: [
        { name: "", quantity: "" },
        { name: "", quantity: "" }
      ],
      requester: ""
    }
  ]

  return (
    <div className="material-record-container space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center text-white p-4" style={{ background: 'rgb(228, 156, 192)' }}>
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">抽袋課</h1>
          <span className="text-lg">領料記錄</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span className="text-sm">{currentDateTime}</span>
        </div>
      </div>

      {/* 抽袋領料單記錄 */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="text-white p-3 rounded-tr-lg rounded-br-lg w-[200px]" style={{ background: '#7c7d99' }}>
          <h2 className="text-base font-semibold leading-tight">抽袋領料單記錄</h2>
        </div>
        
        <div className="p-6 space-y-6">
          {materialRecords.map((record, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              {/* 訂單編號 */}
              <div className="mb-3">
                <span className="text-gray-700 font-medium">訂單編號: </span>
                <span className="text-gray-900 font-semibold">{record.orderNumber}</span>
              </div>
              
              {/* 領料單號 */}
              <div className="text-white p-3 rounded mb-4" style={{ background: 'rgb(228, 156, 192)' }}>
                <span className="font-medium">領料單號: </span>
                <span className="font-semibold">{record.slipNumber}</span>
              </div>
              
              {/* 材料表格 */}
              <Table>
                <TableHeader>
                  <TableRow className="bg-pink-100">
                    <TableHead className="h-12 px-4 text-left align-middle text-gray-700 font-semibold">領料名稱</TableHead>
                    <TableHead className="h-12 px-4 text-left align-middle text-gray-700 font-semibold">數量</TableHead>
                    <TableHead className="h-12 px-4 text-left align-middle text-gray-700 font-semibold">領料名稱</TableHead>
                    <TableHead className="h-12 px-4 text-left align-middle text-gray-700 font-semibold">數量</TableHead>
                    <TableHead className="h-12 px-4 text-left align-middle text-gray-700 font-semibold">領料人員</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {record.materials.map((material, materialIndex) => (
                    <TableRow key={materialIndex} className="border-b">
                      <TableCell className="p-4 align-middle">
                        <div className="h-8 bg-gray-50 rounded border border-gray-200"></div>
                      </TableCell>
                      <TableCell className="p-4 align-middle">
                        <div className="h-8 bg-gray-50 rounded border border-gray-200"></div>
                      </TableCell>
                      <TableCell className="p-4 align-middle">
                        <div className="h-8 bg-gray-50 rounded border border-gray-200"></div>
                      </TableCell>
                      <TableCell className="p-4 align-middle">
                        <div className="h-8 bg-gray-50 rounded border border-gray-200"></div>
                      </TableCell>
                      <TableCell className="p-4 align-middle">
                        <div className="h-8 bg-gray-50 rounded border border-gray-200"></div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
