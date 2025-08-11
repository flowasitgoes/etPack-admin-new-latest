"use client"

import ProductionSpecItem from "./production-spec-item"
import BagSpecs from "./production-specs/bag-specs"
import PrintingSpecs from "./production-specs/printing-specs"
import LaminationSpecs from "./production-specs/lamination-specs"
import SlittingSpecs from "./production-specs/slitting-specs"
import CuttingSpecs from "./production-specs/cutting-specs"
import { productionSpecConfigs } from "@/app/lib/production-spec-config"

export default function ProductionSpecs() {
  const handleEdit = (type: string) => {
    console.log(`編輯 ${type} 生產規格`)
  }

  const handleDelete = (type: string) => {
    console.log(`刪除 ${type} 生產規格`)
  }

  // 渲染生产规格内容
  const renderProductionSpecContent = (type: string) => {
    switch (type) {
      case 'bag':
        return <BagSpecs />
      case 'printing':
        return <PrintingSpecs />
      case 'lamination':
        return <LaminationSpecs />
      case 'slitting':
        return <SlittingSpecs />
      case 'cutting':
        return <CuttingSpecs />
      default:
        return <div>未知生產規格</div>
    }
  }

  return (
    <div className="production-specifications-container space-y-6">
      {productionSpecConfigs.map((config) => (
        <ProductionSpecItem
          key={config.type}
          type={config.type}
          title={config.title}
          bgColor={config.bgColor}
          borderColor={config.borderColor}
          iconColor={config.iconColor}
          onEdit={() => handleEdit(config.type)}
          onDelete={() => handleDelete(config.type)}
        >
          {renderProductionSpecContent(config.type)}
        </ProductionSpecItem>
      ))}
    </div>
  )
} 