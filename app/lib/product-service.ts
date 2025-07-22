// 產品數據類型定義 - 使用統一數據源
export interface Product {
  id: string
  name: string
  variants: string[]
  description?: string
  category?: string
  createdAt: string
  updatedAt: string
}

export interface ProductOrder {
  id: string
  productId: string
  vendor: string
  deliveryDate: string
  quantity: string
  notes: string
  orderDate: string
}

// 從統一數據源導入
import { SharedDataService, type SharedItem, type SharedOrder } from "./shared-data"

// 類型轉換函數
const convertSharedItemToProduct = (item: SharedItem): Product => ({
  id: item.id,
  name: item.name,
  variants: item.variants,
  description: item.description,
  category: item.category,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt
})

const convertSharedOrderToProductOrder = (order: SharedOrder): ProductOrder => ({
  id: order.id,
  productId: order.itemId,
  vendor: order.vendor,
  deliveryDate: order.deliveryDate,
  quantity: order.quantity,
  notes: order.notes,
  orderDate: order.orderDate
})

// 產品服務類 - 使用統一數據源
export class ProductService {
  // 獲取所有產品
  static async getAllProducts(): Promise<Product[]> {
    const items = await SharedDataService.getAllItems()
    return items.map(convertSharedItemToProduct)
  }

  // 根據 ID 獲取產品
  static async getProductById(id: string): Promise<Product | null> {
    const item = await SharedDataService.getItemById(id)
    return item ? convertSharedItemToProduct(item) : null
  }

  // 獲取產品的歷史訂單
  static async getProductOrders(productId: string): Promise<ProductOrder[]> {
    const orders = await SharedDataService.getItemOrders(productId)
    return orders.map(convertSharedOrderToProductOrder)
  }

  // 搜索產品
  static async searchProducts(query: string): Promise<Product[]> {
    const items = await SharedDataService.searchItems(query)
    return items.map(convertSharedItemToProduct)
  }

  // 排序產品
  static async sortProducts(products: Product[], sortBy: string): Promise<Product[]> {
    // 轉換回 SharedItem 進行排序
    const items: SharedItem[] = products.map(product => ({
      id: product.id,
      name: product.name,
      variants: product.variants,
      description: product.description,
      category: product.category || "",
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }))
    
    const sortedItems = await SharedDataService.sortItems(items, sortBy)
    return sortedItems.map(convertSharedItemToProduct)
  }

  // 更新產品
  static async updateProduct(updatedProduct: Product, originalId?: string): Promise<Product> {
    const sharedItem: SharedItem = {
      id: updatedProduct.id,
      name: updatedProduct.name,
      variants: updatedProduct.variants,
      description: updatedProduct.description,
      category: updatedProduct.category || "",
      createdAt: updatedProduct.createdAt,
      updatedAt: updatedProduct.updatedAt
    }
    
    const updatedItem = await SharedDataService.updateItem(sharedItem, originalId)
    return convertSharedItemToProduct(updatedItem)
  }
} 