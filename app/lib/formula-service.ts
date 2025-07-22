// 配方數據類型定義
export interface Formula {
  id: string
  name: string
  variants: string[]
  description?: string
  createdAt: string
  updatedAt: string
}

export interface HistoricalOrder {
  id: string
  formulaId: string
  vendor: string
  deliveryDate: string
  quantity: string
  notes: string
  orderDate: string
}

// 模擬配方數據
export const mockFormulas: Formula[] = [
  {
    id: "WQ001-28",
    name: "阿昌8入",
    variants: ["阿昌8入", "阿昌6入"],
    description: "標準8入包裝配方",
    createdAt: "113/01/15",
    updatedAt: "114/12/01"
  },
  {
    id: "WQ002-15",
    name: "阿昌6入",
    variants: ["阿昌6入", "阿昌4入"],
    description: "經濟6入包裝配方",
    createdAt: "113/03/20",
    updatedAt: "114/11/15"
  },
  {
    id: "WQ003-32",
    name: "阿昌10入",
    variants: ["阿昌10入", "阿昌12入"],
    description: "大容量10入包裝配方",
    createdAt: "113/06/10",
    updatedAt: "114/10/30"
  },
  {
    id: "WQ004-18",
    name: "阿昌4入",
    variants: ["阿昌4入", "阿昌2入"],
    description: "小包裝4入配方",
    createdAt: "113/08/25",
    updatedAt: "114/09/20"
  }
]

// 模擬歷史訂單數據
export const mockHistoricalOrders: HistoricalOrder[] = [
  {
    id: "1",
    formulaId: "WQ001-28",
    vendor: "大潤發",
    deliveryDate: "114/07/01",
    quantity: "5000",
    notes: "準時交貨",
    orderDate: "114/06/15"
  },
  {
    id: "2",
    formulaId: "WQ001-28",
    vendor: "和宸",
    deliveryDate: "114/04/15",
    quantity: "3000",
    notes: "品質優良",
    orderDate: "114/03/30"
  },
  {
    id: "3",
    formulaId: "WQ001-28",
    vendor: "家樂福",
    deliveryDate: "113/10/15",
    quantity: "8000",
    notes: "大量訂單",
    orderDate: "113/09/25"
  },
  {
    id: "4",
    formulaId: "WQ001-28",
    vendor: "美商",
    deliveryDate: "113/03/05",
    quantity: "2000",
    notes: "首次合作",
    orderDate: "113/02/20"
  },
  {
    id: "5",
    formulaId: "WQ002-15",
    vendor: "大潤發",
    deliveryDate: "114/08/10",
    quantity: "4000",
    notes: "追加訂單",
    orderDate: "114/07/25"
  },
  {
    id: "6",
    formulaId: "WQ003-32",
    vendor: "家樂福",
    deliveryDate: "114/09/20",
    quantity: "6000",
    notes: "新產品線",
    orderDate: "114/09/05"
  },
  {
    id: "7",
    formulaId: "WQ004-18",
    vendor: "全聯",
    deliveryDate: "114/11/15",
    quantity: "2500",
    notes: "小包裝試銷",
    orderDate: "114/10/30"
  },
  {
    id: "8",
    formulaId: "WQ004-18",
    vendor: "便利商店",
    deliveryDate: "114/10/08",
    quantity: "1800",
    notes: "便利商店通路",
    orderDate: "114/09/20"
  },
  {
    id: "9",
    formulaId: "WQ004-18",
    vendor: "小北百貨",
    deliveryDate: "114/08/25",
    quantity: "3200",
    notes: "量販店合作",
    orderDate: "114/08/10"
  },
  {
    id: "10",
    formulaId: "WQ004-18",
    vendor: "五金行",
    deliveryDate: "114/07/12",
    quantity: "1500",
    notes: "五金通路",
    orderDate: "114/06/28"
  }
]

// 配方服務類
export class FormulaService {
  // 獲取所有配方
  static async getAllFormulas(): Promise<Formula[]> {
    // 模擬 API 延遲
    await new Promise(resolve => setTimeout(resolve, 100))
    return mockFormulas
  }

  // 根據 ID 獲取配方
  static async getFormulaById(id: string): Promise<Formula | null> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return mockFormulas.find(formula => formula.id === id) || null
  }

  // 獲取配方的歷史訂單
  static async getHistoricalOrders(formulaId: string): Promise<HistoricalOrder[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return mockHistoricalOrders.filter(order => order.formulaId === formulaId)
  }

  // 搜索配方
  static async searchFormulas(query: string): Promise<Formula[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    const lowerQuery = query.toLowerCase()
    return mockFormulas.filter(formula => 
      formula.id.toLowerCase().includes(lowerQuery) ||
      formula.name.toLowerCase().includes(lowerQuery) ||
      formula.variants.some(variant => variant.toLowerCase().includes(lowerQuery))
    )
  }

  // 排序配方
  static async sortFormulas(formulas: Formula[], sortBy: string): Promise<Formula[]> {
    await new Promise(resolve => setTimeout(resolve, 50))
    
    switch (sortBy) {
      case "name":
        return [...formulas].sort((a, b) => a.name.localeCompare(b.name))
      case "order":
        return [...formulas].sort((a, b) => a.id.localeCompare(b.id))
      case "date":
        return [...formulas].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      default:
        return formulas
    }
  }
} 