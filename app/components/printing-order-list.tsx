"use client"

import Link from "next/link"

interface Order {
  orderNumber: string
  productName: string
  quantity: string
  deliveryDate: string
}

export default function PrintingOrderList() {
  const orders: Order[] = [
    {
      orderNumber: "K01140414001",
      productName: "鮮自然2024/厚62u",
      quantity: "12800只/20箱",
      deliveryDate: "114/07/21"
    },
    {
      orderNumber: "K01140414002",
      productName: "2024迪士尼-M28X46.5CM",
      quantity: "1262500只/2箱",
      deliveryDate: "114/11/11"
    },
    {
      orderNumber: "K01140414003",
      productName: "全聯-PL-768",
      quantity: "20000只/23箱",
      deliveryDate: "114/12/12"
    },
    {
      orderNumber: "K01140414004",
      productName: "High End Plastic",
      quantity: "333只/66箱",
      deliveryDate: "114/12/12"
    },
    {
      orderNumber: "K01140414005",
      productName: "7-11便利商店",
      quantity: "300只/500箱",
      deliveryDate: "117/08/25"
    },
    {
      orderNumber: "K01140414006",
      productName: "全家便利商店中秋袋子",
      quantity: "222只/33箱",
      deliveryDate: "114/12/20"
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="text-white p-3 rounded-tr-lg rounded-br-lg w-[200px]" style={{ background: 'rgb(124, 125, 153)' }}>
        <h2 className="text-base font-semibold leading-tight">待生產訂製單列表</h2>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-4">
          查看所有待生產的訂製單列表，點擊訂單編號可查看詳細資訊
        </p>
        <div className="relative w-full overflow-auto">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr 
                  className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted text-white border-b [&:hover]:bg-[rgb(209 138 173)]" 
                  style={{ background: 'rgb(118, 81, 99)' }}
                >
                  <th className="[&:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle text-white font-semibold">
                    訂單編號
                  </th>
                  <th className="[&:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle text-white font-semibold">
                    產品名稱
                  </th>
                  <th className="[&:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle text-white font-semibold">
                    訂製數量
                  </th>
                  <th className="[&:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle text-white font-semibold">
                    交貨日期
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {orders.map((order) => (
                  <tr key={order.orderNumber} className="transition-colors data-[state=selected]:bg-muted border-b hover:bg-gray-50">
                    <td className="[&:has([role=checkbox])]:pr-0 p-4 align-middle bg-purple-100 font-medium">
                      <Link 
                        href={`/printing/${order.orderNumber}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="[&:has([role=checkbox])]:pr-0 p-4 align-middle">
                      {order.productName}
                    </td>
                    <td className="[&:has([role=checkbox])]:pr-0 p-4 align-middle">
                      {order.quantity}
                    </td>
                    <td className="[&:has([role=checkbox])]:pr-0 p-4 align-middle">
                      {order.deliveryDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
