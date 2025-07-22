// 統一的數據類型定義
export interface SharedItem {
  id: string
  name: string
  variants: string[]
  description?: string
  category?: string
  createdAt: string
  updatedAt: string
}

export interface SharedOrder {
  id: string
  itemId: string
  vendor: string
  deliveryDate: string
  quantity: string
  notes: string
  orderDate: string
}

// 統一的模擬數據 - 配方和產品共享
export const mockItems: SharedItem[] = [
  {
    id: "WQ001-28",
    name: "阿昌8入",
    variants: ["阿昌8入", "阿昌6入"],
    description: "標準8入包裝",
    category: "包裝袋",
    createdAt: "113/01/15",
    updatedAt: "114/12/01"
  },
  {
    id: "WQ002-15",
    name: "阿昌6入",
    variants: ["阿昌6入", "阿昌4入"],
    description: "經濟6入包裝",
    category: "包裝袋",
    createdAt: "113/03/20",
    updatedAt: "114/11/15"
  },
  {
    id: "WQ003-32",
    name: "阿昌10入",
    variants: ["阿昌10入", "阿昌12入"],
    description: "大容量10入包裝",
    category: "包裝袋",
    createdAt: "113/06/10",
    updatedAt: "114/10/30"
  },
  {
    id: "WQ004-18",
    name: "阿昌4入",
    variants: ["阿昌4入", "阿昌2入"],
    description: "小包裝4入",
    category: "包裝袋",
    createdAt: "113/08/25",
    updatedAt: "114/09/20"
  },
  {
    id: "WQ005-22",
    name: "環保袋",
    variants: ["環保袋", "可重複使用袋"],
    description: "環保材質",
    category: "環保袋",
    createdAt: "113/10/15",
    updatedAt: "114/08/15"
  },
  {
    id: "WQ006-08",
    name: "購物袋",
    variants: ["購物袋", "手提袋"],
    description: "購物用袋",
    category: "購物袋",
    createdAt: "113/12/01",
    updatedAt: "114/07/10"
  }
]

// 統一的歷史訂單數據
export const mockOrders: SharedOrder[] = [
  {
    id: "1",
    itemId: "WQ001-28",
    vendor: "大潤發",
    deliveryDate: "114/07/01",
    quantity: "5000",
    notes: "準時交貨",
    orderDate: "114/06/15"
  },
  {
    id: "2",
    itemId: "WQ001-28",
    vendor: "和宸",
    deliveryDate: "114/04/15",
    quantity: "3000",
    notes: "品質優良",
    orderDate: "114/03/30"
  },
  {
    id: "3",
    itemId: "WQ001-28",
    vendor: "家樂福",
    deliveryDate: "113/10/15",
    quantity: "8000",
    notes: "大量訂單",
    orderDate: "113/09/25"
  },
  {
    id: "4",
    itemId: "WQ001-28",
    vendor: "美商",
    deliveryDate: "113/03/05",
    quantity: "2000",
    notes: "首次合作",
    orderDate: "113/02/20"
  },
  {
    id: "5",
    itemId: "WQ002-15",
    vendor: "大潤發",
    deliveryDate: "114/08/10",
    quantity: "4000",
    notes: "追加訂單",
    orderDate: "114/07/25"
  },
  {
    id: "6",
    itemId: "WQ003-32",
    vendor: "家樂福",
    deliveryDate: "114/09/20",
    quantity: "6000",
    notes: "新產品線",
    orderDate: "114/09/05"
  },
  {
    id: "7",
    itemId: "WQ004-18",
    vendor: "全聯",
    deliveryDate: "114/11/15",
    quantity: "2500",
    notes: "小包裝試銷",
    orderDate: "114/10/30"
  },
  {
    id: "8",
    itemId: "WQ004-18",
    vendor: "便利商店",
    deliveryDate: "114/10/08",
    quantity: "1800",
    notes: "便利商店通路",
    orderDate: "114/09/20"
  },
  {
    id: "9",
    itemId: "WQ004-18",
    vendor: "小北百貨",
    deliveryDate: "114/08/25",
    quantity: "3200",
    notes: "量販店合作",
    orderDate: "114/08/10"
  },
  {
    id: "10",
    itemId: "WQ004-18",
    vendor: "五金行",
    deliveryDate: "114/07/12",
    quantity: "1500",
    notes: "五金通路",
    orderDate: "114/06/28"
  },
  {
    id: "11",
    itemId: "WQ005-22",
    vendor: "環保商店",
    deliveryDate: "114/08/30",
    quantity: "1800",
    notes: "環保認證",
    orderDate: "114/08/15"
  },
  {
    id: "12",
    itemId: "WQ006-08",
    vendor: "百貨公司",
    deliveryDate: "114/07/20",
    quantity: "2200",
    notes: "百貨通路",
    orderDate: "114/07/05"
  }
]

// 統一的服務類
export class SharedDataService {
  // 獲取所有項目
  static async getAllItems(): Promise<SharedItem[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return mockItems
  }

  // 根據 ID 獲取項目
  static async getItemById(id: string): Promise<SharedItem | null> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return mockItems.find(item => item.id === id) || null
  }

  // 獲取項目的歷史訂單
  static async getItemOrders(itemId: string): Promise<SharedOrder[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return mockOrders.filter(order => order.itemId === itemId)
  }

  // 搜索項目
  static async searchItems(query: string): Promise<SharedItem[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    const lowerQuery = query.toLowerCase()
    return mockItems.filter(item => 
      item.id.toLowerCase().includes(lowerQuery) ||
      item.name.toLowerCase().includes(lowerQuery) ||
      item.variants.some(variant => variant.toLowerCase().includes(lowerQuery))
    )
  }

  // 排序項目
  static async sortItems(items: SharedItem[], sortBy: string): Promise<SharedItem[]> {
    await new Promise(resolve => setTimeout(resolve, 50))
    
    switch (sortBy) {
      case "name":
        return [...items].sort((a, b) => a.name.localeCompare(b.name))
      case "number":
      case "order":
        return [...items].sort((a, b) => a.id.localeCompare(b.id))
      case "date":
        return [...items].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      default:
        return items
    }
  }

  // 更新項目
  static async updateItem(updatedItem: SharedItem, originalId?: string): Promise<SharedItem> {
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // 如果提供了原始ID，說明是ID變更的情況
    const searchId = originalId || updatedItem.id
    const index = mockItems.findIndex(item => item.id === searchId)
    
    if (index !== -1) {
      // 更新項目
      mockItems[index] = {
        ...updatedItem,
        updatedAt: new Date().toLocaleDateString('zh-TW', { 
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).replace(/\//g, '/')
      }
      
      // 如果ID有變更，需要更新相關的訂單記錄
      if (originalId && originalId !== updatedItem.id) {
        mockOrders.forEach(order => {
          if (order.itemId === originalId) {
            order.itemId = updatedItem.id
          }
        })
      }
      
      return mockItems[index]
    }
    
    // 如果找不到項目，返回更新後的項目（這種情況不應該發生）
    return updatedItem
  }
} 