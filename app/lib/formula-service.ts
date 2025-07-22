// 配方數據類型定義 - 使用統一數據源
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

// 從統一數據源導入
import { SharedDataService, type SharedItem, type SharedOrder } from "./shared-data"

// 類型轉換函數
const convertSharedItemToFormula = (item: SharedItem): Formula => ({
  id: item.id,
  name: item.name,
  variants: item.variants,
  description: item.description,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt
})

const convertSharedOrderToHistoricalOrder = (order: SharedOrder): HistoricalOrder => ({
  id: order.id,
  formulaId: order.itemId,
  vendor: order.vendor,
  deliveryDate: order.deliveryDate,
  quantity: order.quantity,
  notes: order.notes,
  orderDate: order.orderDate
})

// 配方服務類 - 使用統一數據源
export class FormulaService {
  // 獲取所有配方
  static async getAllFormulas(): Promise<Formula[]> {
    const items = await SharedDataService.getAllItems()
    return items.map(convertSharedItemToFormula)
  }

  // 根據 ID 獲取配方
  static async getFormulaById(id: string): Promise<Formula | null> {
    const item = await SharedDataService.getItemById(id)
    return item ? convertSharedItemToFormula(item) : null
  }

  // 獲取配方的歷史訂單
  static async getHistoricalOrders(formulaId: string): Promise<HistoricalOrder[]> {
    const orders = await SharedDataService.getItemOrders(formulaId)
    return orders.map(convertSharedOrderToHistoricalOrder)
  }

  // 搜索配方
  static async searchFormulas(query: string): Promise<Formula[]> {
    const items = await SharedDataService.searchItems(query)
    return items.map(convertSharedItemToFormula)
  }

  // 排序配方
  static async sortFormulas(formulas: Formula[], sortBy: string): Promise<Formula[]> {
    // 轉換回 SharedItem 進行排序
    const items: SharedItem[] = formulas.map(formula => ({
      id: formula.id,
      name: formula.name,
      variants: formula.variants,
      description: formula.description,
      category: "",
      createdAt: formula.createdAt,
      updatedAt: formula.updatedAt
    }))
    
    const sortedItems = await SharedDataService.sortItems(items, sortBy)
    return sortedItems.map(convertSharedItemToFormula)
  }
} 