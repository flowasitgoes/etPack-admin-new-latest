"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface ProductionSpecItem {
  id: string
  type: 'bag' | 'printing' | 'lamination' | 'slitting' | 'cutting'
  createdAt: string
  number: string // 添加编号字段
}

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

interface ProductionSpecsContextType {
  productionSpecs: ProductionSpecItem[]
  addProductionSpec: (type: 'bag' | 'printing' | 'lamination' | 'slitting' | 'cutting') => void
  deleteProductionSpec: (id: string) => void
  editProductionSpec: (id: string) => void
  clearAllProductionSpecs: () => void
  scrollToNewForm: (id: string) => void
  initializeFromOrderData: (orderData: OrderData) => void
}

const ProductionSpecsContext = createContext<ProductionSpecsContextType | undefined>(undefined)

export function LaminatingProductionSpecsProvider({ children }: { children: ReactNode }) {
  // 初始状态包含一个貼合模組
  const [productionSpecs, setProductionSpecs] = useState<ProductionSpecItem[]>([
    {
      id: `lamination-${Date.now()}`,
      type: 'lamination',
      createdAt: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}`,
      number: '01'
    }
  ])

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

  const initializeFromOrderData = (orderData: OrderData) => {
    const newProductionSpecs: ProductionSpecItem[] = []
    
    // 處理抽袋模組
    if (orderData.bagging && orderData.bagging.length > 0) {
      orderData.bagging.forEach((item, index) => {
        newProductionSpecs.push({
          id: `bag-${orderData.orderNumber}-${String(index + 1).padStart(2, '0')}`,
          type: 'bag',
          createdAt: item.createdAt || `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}`,
          number: String(index + 1).padStart(2, '0')
        })
      })
    }
    
    // 處理印刷模組
    if (orderData.printing && orderData.printing.length > 0) {
      orderData.printing.forEach((item, index) => {
        newProductionSpecs.push({
          id: `printing-${orderData.orderNumber}-${String(index + 1).padStart(2, '0')}`,
          type: 'printing',
          createdAt: item.createdAt || `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}`,
          number: String(index + 1).padStart(2, '0')
        })
      })
    }
    
    // 處理貼合模組
    if (orderData.lamination && orderData.lamination.length > 0) {
      orderData.lamination.forEach((item, index) => {
        newProductionSpecs.push({
          id: `lamination-${orderData.orderNumber}-${String(index + 1).padStart(2, '0')}`,
          type: 'lamination',
          createdAt: item.createdAt || `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}`,
          number: String(index + 1).padStart(2, '0')
        })
      })
    }
    
    // 處理分條模組
    if (orderData.slitting && orderData.slitting.length > 0) {
      orderData.slitting.forEach((item, index) => {
        newProductionSpecs.push({
          id: `slitting-${orderData.orderNumber}-${String(index + 1).padStart(2, '0')}`,
          type: 'slitting',
          createdAt: item.createdAt || `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}`,
          number: String(index + 1).padStart(2, '0')
        })
      })
    }
    
    // 處理裁袋模組
    if (orderData.cutting && orderData.cutting.length > 0) {
      orderData.cutting.forEach((item, index) => {
        newProductionSpecs.push({
          id: `cutting-${orderData.orderNumber}-${String(index + 1).padStart(2, '0')}`,
          type: 'cutting',
          createdAt: item.createdAt || `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}`,
          number: String(index + 1).padStart(2, '0')
        })
      })
    }
    
    // 如果沒有找到任何生產規格，至少添加一個貼合模組
    if (newProductionSpecs.length === 0) {
      newProductionSpecs.push({
        id: `lamination-${orderData.orderNumber}-01`,
        type: 'lamination',
        createdAt: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}`,
        number: '01'
      })
    }
    
    setProductionSpecs(newProductionSpecs)
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

export function useLaminatingProductionSpecs() {
  const context = useContext(ProductionSpecsContext)
  if (context === undefined) {
    throw new Error('useLaminatingProductionSpecs must be used within a LaminatingProductionSpecsProvider')
  }
  return context
}
