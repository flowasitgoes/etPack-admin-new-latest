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
  scrollToNewForm: (id: string) => void
  initializeFromOrderData: (orderData: any) => void
}

const ProductionSpecsContext = createContext<ProductionSpecsContextType | undefined>(undefined)

export function BaggingProductionSpecsProvider({ children }: { children: ReactNode }) {
  // 初始状态包含一个抽袋模組
  const [productionSpecs, setProductionSpecs] = useState<ProductionSpecItem[]>([
    {
      id: `bag-${Date.now()}`,
      type: 'bag',
      createdAt: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}`,
      number: '01'
    }
  ])

  const initializeFromOrderData = (orderData: any) => {
    if (!orderData) return

    const specs: ProductionSpecItem[] = []
    
    // 處理 bagging 資料
    if (orderData.bagging && Array.isArray(orderData.bagging)) {
      orderData.bagging.forEach((item: any, index: number) => {
        specs.push({
          id: item.id || `bag-${Date.now()}-${index}`,
          type: 'bag',
          createdAt: item.createdAt || new Date().toISOString(),
          number: item.moduleNumber || String(index + 1).padStart(2, '0')
        })
      })
    }

    // 處理 printing 資料
    if (orderData.printing && Array.isArray(orderData.printing)) {
      orderData.printing.forEach((item: any, index: number) => {
        specs.push({
          id: item.id || `printing-${Date.now()}-${index}`,
          type: 'printing',
          createdAt: item.createdAt || new Date().toISOString(),
          number: item.moduleNumber || String(index + 1).padStart(2, '0')
        })
      })
    }

    // 處理 lamination 資料
    if (orderData.lamination && Array.isArray(orderData.lamination)) {
      orderData.lamination.forEach((item: any, index: number) => {
        specs.push({
          id: item.id || `lamination-${Date.now()}-${index}`,
          type: 'lamination',
          createdAt: item.createdAt || new Date().toISOString(),
          number: item.moduleNumber || String(index + 1).padStart(2, '0')
        })
      })
    }

    // 處理 slitting 資料
    if (orderData.slitting && Array.isArray(orderData.slitting)) {
      orderData.slitting.forEach((item: any, index: number) => {
        specs.push({
          id: item.id || `slitting-${Date.now()}-${index}`,
          type: 'slitting',
          createdAt: item.createdAt || new Date().toISOString(),
          number: item.moduleNumber || String(index + 1).padStart(2, '0')
        })
      })
    }

    // 處理 cutting 資料
    if (orderData.cutting && Array.isArray(orderData.cutting)) {
      orderData.cutting.forEach((item: any, index: number) => {
        specs.push({
          id: item.id || `cutting-${Date.now()}-${index}`,
          type: 'cutting',
          createdAt: item.createdAt || new Date().toISOString(),
          number: item.moduleNumber || String(index + 1).padStart(2, '0')
        })
      })
    }

    // 如果沒有資料，保持預設的 bag 模組
    if (specs.length === 0) {
      specs.push({
        id: `bag-${Date.now()}`,
        type: 'bag',
        createdAt: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}`,
        number: '01'
      })
    }

    setProductionSpecs(specs)
  }

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
    
    // 将新项目添加到列表末尾
    setProductionSpecs(prev => [...prev, newItem])
    
    // 延迟滚动到新表单，确保DOM已更新
    setTimeout(() => {
      scrollToNewForm(newItem.id)
    }, 100)
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

  const scrollToNewForm = (id: string) => {
    const element = document.getElementById(`production-spec-${id}`)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      })
      
      // 添加高亮效果
      element.classList.add('highlight-new-form')
      setTimeout(() => {
        element.classList.remove('highlight-new-form')
      }, 2000)
    }
  }

  return (
    <ProductionSpecsContext.Provider value={{
      productionSpecs,
      addProductionSpec,
      deleteProductionSpec,
      editProductionSpec,
      clearAllProductionSpecs,
      scrollToNewForm,
      initializeFromOrderData
    }}>
      {children}
    </ProductionSpecsContext.Provider>
  )
}

export function useBaggingProductionSpecs() {
  const context = useContext(ProductionSpecsContext)
  if (context === undefined) {
    throw new Error('useBaggingProductionSpecs must be used within a BaggingProductionSpecsProvider')
  }
  return context
}
