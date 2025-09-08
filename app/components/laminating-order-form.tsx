"use client"

import { Upload } from "lucide-react"

interface OrderData {
  orderNumber: string
  date: string
  orderInfo: {
    customerName: string
    customerCode: string
    productCode: string
    productName: string
    orderQuantity: string
    orderUnit1: string
    orderQuantity2: string
    orderUnit2: string
    deliveryDate: string
    formulaNumber: string
    sampleFile: string
  }
  bagging: any[]
  printing: any[]
  lamination: any[]
  slitting: any[]
  cutting: any[]
  submittedAt: string
  status: string
}

interface LaminatingOrderFormProps {
  orderData: OrderData
}

export default function LaminatingOrderForm({ orderData }: LaminatingOrderFormProps) {
  return (
    <div className="mid-col-order-details-and-prod-spec">
      {/* Order Details Form */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">客戶名稱</div>
            <div className="flex h-10 w-full px-3 py-2 text-base md:text-sm flex-1 bg-gray-100 items-center border-b-2 border-gray-400">
              {orderData.orderInfo.customerName}
            </div>
            
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">編號</div>
            <div className="flex h-10 w-full px-3 py-2 text-base md:text-sm flex-1 bg-gray-100 items-center border-b-2 border-gray-400">
              {orderData.orderInfo.customerCode}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">產品編號</div>
            <div className="flex h-10 w-full px-3 py-2 text-base md:text-sm flex-1 bg-gray-100 items-center border-b-2 border-gray-400">
              {orderData.orderInfo.productCode}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">品名</div>
            <div className="flex h-10 w-full px-3 py-2 text-base md:text-sm flex-1 bg-gray-100 items-center border-b-2 border-gray-400">
              {orderData.orderInfo.productName}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">訂製數量</div>
            <div className="flex h-10 w-full px-3 py-2 text-base md:text-sm flex-1 bg-gray-100 items-center border-b-2 border-gray-400">
              {orderData.orderInfo.orderQuantity}
            </div>
            <div className="flex h-10 items-center justify-between px-3 py-2 text-sm w-20 bg-gray-100 border-b-2 border-gray-400">
              <span>{orderData.orderInfo.orderUnit1}</span>
            </div>
            <div className="flex h-10 px-3 py-2 text-base md:text-sm w-20 bg-gray-100 items-center border-b-2 border-gray-400">
              {orderData.orderInfo.orderQuantity2}
            </div>
            <div className="flex h-10 items-center justify-between px-3 py-2 text-sm w-20 bg-gray-100 border-b-2 border-gray-400">
              <span>{orderData.orderInfo.orderUnit2}</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">交貨日期</div>
            <div className="flex h-10 w-full px-3 py-2 text-base md:text-sm flex-1 bg-gray-100 items-center border-b-2 border-gray-400">
              {orderData.orderInfo.deliveryDate}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">配方編號</div>
            <div className="flex h-10 w-full px-3 py-2 text-base md:text-sm flex-1 bg-gray-100 items-center border-b-2 border-gray-400">
              {orderData.orderInfo.formulaNumber}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">樣品/圖稿</div>
            <div className="flex items-center space-x-2 flex-1">
              <div className="flex h-10 w-full px-3 py-2 text-base md:text-sm flex-1 bg-gray-100 items-center border-b-2 border-gray-400">
                {orderData.orderInfo.sampleFile || "無"}
              </div>
              <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 bg-gray-100">
                <Upload className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
