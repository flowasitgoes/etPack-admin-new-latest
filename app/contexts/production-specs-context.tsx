"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface ProductionSpecItem {
  id: string
  type: 'bag' | 'printing' | 'lamination' | 'slitting' | 'cutting'
  createdAt: string
  number: string // 添加编号字段
}

interface ProductionSpecsContextType {
  productionSpecs: ProductionSpecItem[]
  addProductionSpec: (type: 'bag' | 'printing' | 'lamination' | 'slitting' | 'cutting') => void
  deleteProductionSpec: (id: string) => void
  editProductionSpec: (id: string) => void
  clearAllProductionSpecs: () => void
}

const ProductionSpecsContext = createContext<ProductionSpecsContextType | undefined>(undefined)

export function ProductionSpecsProvider({ children }: { children: ReactNode }) {
  // 初始状态为空数组，不显示任何课别的表单
  const [productionSpecs, setProductionSpecs] = useState<ProductionSpecItem[]>([])

  const addProductionSpec = (type: 'bag' | 'printing' | 'lamination' | 'slitting' | 'cutting') => {
    const now = new Date()
    const createdAt = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
    
    // 计算当前类型的编号
    const existingOfType = productionSpecs.filter(item => item.type === type).length
    const number = String(existingOfType + 1).padStart(2, '0')
    
    const newItem: ProductionSpecItem = {
      id: `${type}-${Date.now()}`,
      type,
      createdAt,
      number
    }
    
    // 将新项目添加到列表开头
    setProductionSpecs(prev => [newItem, ...prev])
  }

  const deleteProductionSpec = (id: string) => {
    setProductionSpecs(prev => {
      const filtered = prev.filter(item => item.id !== id)
      
      // 按类型分组并按创建时间排序
      const typeGroups = filtered.reduce((acc, item) => {
        if (!acc[item.type]) acc[item.type] = []
        acc[item.type].push(item)
        return acc
      }, {} as Record<string, ProductionSpecItem[]>)
      
      // 对每个类型组按创建时间排序（从早到晚）
      Object.keys(typeGroups).forEach(type => {
        typeGroups[type].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      })
      
      // 重新分配编号
      const renumbered = filtered.map(item => {
        const group = typeGroups[item.type]
        const index = group.findIndex(gItem => gItem.id === item.id)
        return {
          ...item,
          number: String(index + 1).padStart(2, '0')
        }
      })
      
      return renumbered
    })
  }

  const editProductionSpec = (id: string) => {
    console.log(`編輯 ${id} 生產規格`)
  }

  const clearAllProductionSpecs = () => {
    setProductionSpecs([])
  }

  return (
    <ProductionSpecsContext.Provider value={{
      productionSpecs,
      addProductionSpec,
      deleteProductionSpec,
      editProductionSpec,
      clearAllProductionSpecs
    }}>
      {children}
    </ProductionSpecsContext.Provider>
  )
}

export function useProductionSpecs() {
  const context = useContext(ProductionSpecsContext)
  if (context === undefined) {
    throw new Error('useProductionSpecs must be used within a ProductionSpecsProvider')
  }
  return context
}
