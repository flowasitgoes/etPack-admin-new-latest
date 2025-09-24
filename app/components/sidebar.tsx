"use client"

import DepartmentTabs from "./sidebar/department-tabs"
import UserProfile from "./sidebar/user-profile"
import SearchBar from "./sidebar/search-bar"
import NavigationMenu from "./sidebar/navigation-menu"
import RecentOrdersSection from "./recent-orders-section"

interface SidebarProps {
  activeModule?: string
  onModuleChange?: (module: string) => void
}

export default function Sidebar({ activeModule = "orders", onModuleChange }: SidebarProps) {
  return (
    <div className="admin-left-sidebar bg-gray-50 flex flex-col h-full">
      {/* 課別分頁 */}
      <DepartmentTabs />

      {/* 用戶資料和搜尋區域 */}
      <div className="user-and-search-section p-6 pb-0">
        <UserProfile />
        <SearchBar />
      </div>

      {/* 導航選單 */}
      <NavigationMenu activeModule={activeModule} onModuleChange={onModuleChange} />

      {/* 分隔線 */}
      <div className="flex-1"></div>
      <div className="border-t border-gray-200 mx-4 my-2"></div>

      {/* 最近新增訂單區域 */}
      <div className="flex-shrink-0">
        <RecentOrdersSection />
      </div>
    </div>
  )
}

