"use client"

import ProductionSpecItem from "./production-spec-item"
import BagSpecs from "./production-specs/bag-specs"
import PrintingSpecs from "./production-specs/printing-specs"
import LaminationSpecs from "./production-specs/lamination-specs"
import SlittingSpecs from "./production-specs/slitting-specs"
import CuttingSpecs from "./production-specs/cutting-specs"
import { productionSpecConfigs } from "@/app/lib/production-spec-config"
import { useBaggingProductionSpecs } from "@/app/contexts/bagging-production-specs-context"

export default function BaggingProductionSpecs() {
  const { productionSpecs, deleteProductionSpec, editProductionSpec } = useBaggingProductionSpecs()

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
      {productionSpecs.map((item) => {
        const config = productionSpecConfigs.find(c => c.type === item.type)
        if (!config) return null

        return (
          <ProductionSpecItem
            key={item.id}
            id={item.id}
            type={item.type}
            title={config.title}
            bgColor={config.bgColor}
            borderColor={config.borderColor}
            iconColor={config.iconColor}
            createdAt={item.createdAt}
            number={item.number}
            onEdit={() => editProductionSpec(item.id)}
            onDelete={() => deleteProductionSpec(item.id)}
          >
            {renderProductionSpecContent(item.type)}
          </ProductionSpecItem>
        )
      })}
    </div>
  )
}
