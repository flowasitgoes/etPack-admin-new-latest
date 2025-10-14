"use client"

import { usePathname, useRouter } from "next/navigation"

interface NavigationMenuProps {
  activeModule?: string
  onModuleChange?: (module: string) => void
}

export default function NavigationMenu({ activeModule = "orders", onModuleChange }: NavigationMenuProps) {
  const pathname = usePathname()
  const router = useRouter()

  // 根據當前路由自動設置活躍模組
  const getActiveModuleFromPath = () => {
    if (pathname === '/employee-info') {
      return 'employee-database'
    }
    if (pathname === '/employee-preview') {
      return 'employee-database'
    }
    if (pathname === '/employee-pre-info') {
      return 'employee-database'
    }
    if (pathname === '/employee-table') {
      return 'employee-database'
    }
    if (pathname === '/formulas') {
      return 'formulas'
    }
    if (pathname === '/vendors') {
      return 'vendors'
    }
    if (pathname === '/products') {
      return 'products'
    }
    if (pathname === '/orders') {
      return 'orders'
    }
    return activeModule
  }

  const currentActiveModule = getActiveModuleFromPath()

  const menuItems = [
    { id: "schedule", label: "工作排程", isActive: activeModule === "schedule" },
    { id: "orders", label: "訂製單記錄", isActive: currentActiveModule === "orders" },
    { id: "vendors", label: "客戶資訊", isActive: currentActiveModule === "vendors" },
    { id: "products", label: "產品資訊", isActive: currentActiveModule === "products" },
    { id: "formulas", label: "配方資料庫", isActive: currentActiveModule === "formulas" },
    { id: "employee-database", label: "員工資料庫", isActive: currentActiveModule === "employee-database" }
  ]

  const handleMenuClick = (itemId: string) => {
    // 如果點擊員工資料庫，直接跳轉到獨立路由
    if (itemId === 'employee-database') {
      router.push('/employee-table')
      return
    }
    
    // 檢查是否在員工相關頁面
    const isOnEmployeePage = pathname === '/employee-info' || 
                            pathname === '/employee-preview' || 
                            pathname === '/employee-pre-info'
    
    if (isOnEmployeePage) {
      // 如果在員工頁面，跳轉到主頁面並帶上模組參數
      router.push(`/?module=${itemId}`)
    } else {
      // 如果在主頁面，直接切換模組
      onModuleChange?.(itemId)
    }
  }

  return (
    <nav className="space-y-2 px-4">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`text-center px-4 py-3 cursor-pointer transition-colors ${
            item.isActive
              ? "bg-gradient-primary text-white"
              : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
          }`}
          onClick={() => handleMenuClick(item.id)}
        >
          {item.label}
        </div>
      ))}
    </nav>
  )
}
