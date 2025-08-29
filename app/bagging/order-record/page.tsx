"use client"

import { useState, useEffect } from "react"
import { Calendar } from "lucide-react"
import BaggingOrderForm from "../../components/bagging-order-form"
import BaggingProductionSpecs from "../../components/bagging-production-specs"
import { BaggingProductionSpecsProvider } from "../../contexts/bagging-production-specs-context"

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

  // 寫死的訂單資料，來自 order-2025-08-25T03-21-15-107Z.json
  const staticOrderData = {
    orderNumber: "K01140414001",
    date: "114/03/20",
    orderInfo: {
      customerName: "譯加/KP0510",
      customerCode: "KP0510",
      productCode: "P0510-A03022",
      productName: "鮮自然2024/厚62u",
      orderQuantity: "12800",
      orderUnit1: "只",
      orderQuantity2: "20",
      orderUnit2: "箱",
      deliveryDate: "114/07/21",
      formulaNumber: "EW-28-1",
      sampleFile: "樣品圖稿.jpg"
    },
    bagging: [
      {
        id: "bag-K01140414001-01",
        orderNumber: "K01140414001",
        createdAt: "2025-08-25 11:19:22",
        moduleNumber: "01",
        thickness: "0.05",
        width: "82",
        cornerFolding: {
          totalWidth: "41.2",
          face: "14.5",
          fold: "2.5",
          oneSideFold: "1.2"
        },
        formula: "EW-28-1",
        dyeing: {
          type: "透明",
          value: "染白"
        },
        processing: {
          type: "全處理",
          value: "雙理"
        },
        cutting: {
          type: "雙剖雙收",
          value: "標準"
        },
        trimming: {
          type: "標準",
          value: "無"
        },
        printing: {
          print: "4",
          color: "2",
          plateLength: "420",
          circumference: "42"
        },
        otherConditions: "抽3000M*2R / 約 260K\n染白雙理"
      }
    ],
    printing: [
      {
        id: "printing-K01140414001-01",
        orderNumber: "K01140414001",
        createdAt: "2025-08-25 11:21:03",
        moduleNumber: "01",
        printing: {
          colors: "",
          sides: ""
        },
        circumference: "",
        plateLength: "",
        barcode: "",
        material: {
          type: "外購",
          supplier: "",
          material: "其他",
          thickness: "",
          width: ""
        },
        quantity: {
          meters: "",
          rolls: "",
          kgs: "",
          kgsRolls: ""
        },
        ink: [
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        position: {
          type: "距左邊",
          distance: "",
          other: ""
        },
        windingDirection: {
          type: "其他",
          value: ""
        },
        otherConditions: "印刷"
      }
    ],
    lamination: [
      {
        id: "lamination-K01140414001-01",
        orderNumber: "K01140414001",
        createdAt: "2025-08-25 11:21:05",
        moduleNumber: "01",
        materialA: {
          type: "其他",
          value: "",
          thickness: "",
          width: "",
          quantity: {
            meters: "",
            rolls: "",
            kgs: "",
            kgsRolls: ""
          }
        },
        materialB: {
          type: "其他",
          value: "",
          thickness: "",
          width: "",
          quantity: {
            meters: "",
            rolls: "",
            kgs: "",
            kgsRolls: ""
          }
        },
        otherConditions: "料膜 A"
      }
    ],
    slitting: [
      {
        id: "slitting-K01140414001-01",
        orderNumber: "K01140414001",
        createdAt: "2025-08-25 11:21:09",
        moduleNumber: "01",
        material: "",
        stage1: {
          type: "其他",
          size: "",
          quantity: {
            meters: "",
            rolls: ""
          }
        },
        stage2: {
          type: "其他",
          size: "",
          quantity: {
            meters: "",
            rolls: ""
          }
        },
        windingDirection: {
          type: "其他",
          value: ""
        },
        cornerFolding: {
          bagWidth: "",
          faceWidth: "",
          fold: "",
          oneSideFold: "",
          quantity: ""
        },
        otherConditions: "料膜"
      }
    ],
    cutting: [
      {
        id: "cutting-K01140414001-01",
        orderNumber: "K01140414001",
        createdAt: "2025-08-25 11:21:13",
        moduleNumber: "01",
        bagType: "醫療平口袋",
        bagType2: "請選擇",
        printingPattern: "請選擇",
        bagLength: "",
        quantity: {
          amount: "",
          unit: "磅/捆"
        },
        smallPackage: {
          amount: "",
          unit: "束"
        },
        largePackage: {
          amount: "",
          unit: "塑膠袋"
        },
        tapeColor: {
          type: "其他",
          value: ""
        },
        otherConditions: "袋型"
      }
    ],
    submittedAt: "2025-08-25T03:21:14.856Z",
    status: "submitted"
  }

  return (
    <BaggingProductionSpecsProvider>
      <div 
        className="order-record-container space-y-6 transition-all duration-300 ease-in-out"
        style={{ opacity: pageOpacity }}
      >
        {/* Header */}
        <div className="flex justify-between items-center text-white p-4" style={{ background: 'rgb(209 138 173)' }}>
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">抽袋課</h1>
            <span className="text-lg">訂製單記錄</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span className="text-sm">{currentDateTime}</span>
          </div>
        </div>

        {/* Order Header */}
        <div className="order-header-wrap">
          <div className="bg-gray-600 text-white px-6 py-3 mb-6 flex justify-between items-center">
            <span className="font-medium">訂單編號 {staticOrderData.orderNumber}</span>
          </div>

          <div className="px-6 py-3 mb-6 flex justify-between items-center">
            <span className="text-sm">日期: {staticOrderData.date}</span>
          </div>
        </div>
        
        {/* Order Form */}
        <BaggingOrderForm orderData={staticOrderData} />

        {/* Production Specifications */}
        <BaggingProductionSpecs useStaticData={true} />
      </div>
    </BaggingProductionSpecsProvider>
  )
}
