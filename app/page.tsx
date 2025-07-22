"use client"

import { useState } from "react"
import Sidebar from "./components/sidebar"
import StaffInfo from "./components/staff-info"
import OrdersPage from "./orders/page"
import SchedulePage from "./schedule/page"
import VendorsPage from "./vendors/page"
import ProductsPage from "./products/page"
import FormulasPage from "./formulas/page"
import "../styles/admin-colors.css"
import "../styles/admin.css"

export default function ERPAdmin() {
  const [activeModule, setActiveModule] = useState("orders")

  const renderActiveModule = () => {
    switch (activeModule) {
      case "orders":
        return <OrdersPage />
      case "schedule":
        return <SchedulePage />
      case "vendors":
        return <VendorsPage />
      case "products":
        return <ProductsPage />
      case "formulas":
        return <FormulasPage />
      default:
        return <OrdersPage />
    }
  }
  return (
    <div className="admin-container min-h-screen bg-gradient-to-br p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex h-screen">
          {/* Left Sidebar */}
          <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />

          {/* Main Content */}
          <div className="middle-col-section flex-1 flex" style={{ overflow: "scroll" }}>
            {renderActiveModule()}

            {/* Right Sidebar - Staff Info */}
            <StaffInfo />
          </div>
        </div>
      </div>
    </div>
  )
}
