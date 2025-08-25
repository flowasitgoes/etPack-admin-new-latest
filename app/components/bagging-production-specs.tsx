"use client"

import ProductionSpecItem from "./production-spec-item"
import BaggingBagSpecs from "./bagging-bag-specs"
import BaggingPrintingSpecs from "./bagging-printing-specs"
import BaggingLaminationSpecs from "./bagging-lamination-specs"
import BaggingSlittingSpecs from "./bagging-slitting-specs"
import BaggingCuttingSpecs from "./bagging-cutting-specs"
import { productionSpecConfigs } from "@/app/lib/production-spec-config"
import { useBaggingProductionSpecs } from "@/app/contexts/bagging-production-specs-context"

interface BaggingProductionSpecsProps {
  useStaticData?: boolean
}

export default function BaggingProductionSpecs({ useStaticData = false }: BaggingProductionSpecsProps) {
  const { productionSpecs, deleteProductionSpec, editProductionSpec } = useBaggingProductionSpecs()

  // 寫死的生產規格資料
  const staticProductionSpecs = [
    {
      id: "bag-K01140414001-01",
      type: "bag" as const,
      createdAt: "2025-08-25 11:19:22",
      number: "01"
    },
    {
      id: "printing-K01140414001-01",
      type: "printing" as const,
      createdAt: "2025-08-25 11:21:03",
      number: "01"
    },
    {
      id: "lamination-K01140414001-01",
      type: "lamination" as const,
      createdAt: "2025-08-25 11:21:05",
      number: "01"
    },
    {
      id: "slitting-K01140414001-01",
      type: "slitting" as const,
      createdAt: "2025-08-25 11:21:09",
      number: "01"
    },
    {
      id: "cutting-K01140414001-01",
      type: "cutting" as const,
      createdAt: "2025-08-25 11:21:13",
      number: "01"
    }
  ]

  // 渲染生产规格内容 - 使用專門的唯讀組件
  const renderProductionSpecContent = (type: string) => {
    switch (type) {
      case 'bag':
        return <BaggingBagSpecs />
      case 'printing':
        return <BaggingPrintingSpecs />
      case 'lamination':
        return <BaggingLaminationSpecs />
      case 'slitting':
        return <BaggingSlittingSpecs />
      case 'cutting':
        return <BaggingCuttingSpecs />
      default:
        return <div>未知生產規格</div>
    }
  }

  // 決定使用哪個資料來源
  const specsToRender = useStaticData ? staticProductionSpecs : productionSpecs

  return (
    <div className="production-specifications-container space-y-6">
      {specsToRender.map((item) => {
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
