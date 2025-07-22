# 產品資訊模組 (Product Information Module)

## 概述

產品資訊模組是 ERP 管理系統的核心功能之一，提供完整的產品管理功能，包括產品列表展示、排序、搜索以及歷史訂單記錄查詢。

## 架構設計

### 組件結構

```
app/products/
├── page.tsx                 # 主頁面組件
├── README.md               # 模組文檔
└── components/             # 相關組件
    ├── product-list.tsx    # 產品列表組件
    └── product-orders.tsx  # 產品歷史訂單組件
```

### 數據服務層

```
app/lib/
└── product-service.ts      # 產品數據服務
```

## 功能特性

### 1. 產品列表管理
- **產品展示**：以表格形式展示產品編號和品名
- **排序功能**：支持按名稱排序和編號排序
- **產品選擇**：點擊產品可查看其歷史訂單記錄
- **響應式設計**：支持不同屏幕尺寸

### 2. 歷史訂單記錄
- **訂單查詢**：顯示選中產品的所有歷史訂單
- **詳細信息**：包含廠商名稱、交貨日期、訂單數量、備註
- **動態載入**：只在選擇產品後才顯示訂單記錄
- **淡入效果**：平滑的視覺過渡效果

### 3. 用戶體驗優化
- **頁面淡入**：頁面載入時的平滑過渡效果
- **載入狀態**：數據載入期間顯示載入動畫
- **提示信息**：引導用戶點擊產品查看訂單記錄
- **即時反饋**：排序和選擇操作的即時響應

## 數據模型

### Product 接口
```typescript
interface Product {
  id: string           // 產品編號
  name: string         // 產品名稱
  variants: string[]   // 產品變體
  description?: string // 產品描述
  category?: string    // 產品類別
  createdAt: string    // 創建日期
  updatedAt: string    // 更新日期
}
```

### ProductOrder 接口
```typescript
interface ProductOrder {
  id: string          // 訂單ID
  productId: string   // 產品ID
  vendor: string      // 廠商名稱
  deliveryDate: string // 交貨日期
  quantity: string    // 訂單數量
  notes: string       // 備註
  orderDate: string   // 訂單日期
}
```

## 組件詳解

### ProductList 組件
- **功能**：展示產品列表和排序控制
- **Props**：
  - `products`: 產品數據數組
  - `selectedProduct`: 當前選中的產品ID
  - `sortBy`: 當前排序方式
  - `onProductSelect`: 產品選擇回調
  - `onSortChange`: 排序變更回調

### ProductOrders 組件
- **功能**：展示產品的歷史訂單記錄
- **Props**：
  - `productId`: 產品ID
  - `orders`: 訂單數據數組
- **特性**：淡入動畫效果

## 使用方式

### 基本使用
```typescript
import ProductsPage from './app/products/page'

// 在路由中使用
<Route path="/products" component={ProductsPage} />
```

### 數據服務使用
```typescript
import { ProductService } from './lib/product-service'

// 獲取所有產品
const products = await ProductService.getAllProducts()

// 獲取產品訂單
const orders = await ProductService.getProductOrders('WQ001-28')

// 排序產品
const sortedProducts = await ProductService.sortProducts(products, 'name')
```

## 擴展性

### 添加新功能
1. **搜索功能**：可在 ProductList 組件中添加搜索框
2. **篩選功能**：可按產品類別、日期範圍等進行篩選
3. **分頁功能**：處理大量產品數據時的分頁顯示
4. **編輯功能**：產品信息的編輯和更新功能

### 數據源擴展
- 支持從 API 獲取真實數據
- 支持數據庫連接
- 支持實時數據更新

## 維護說明

### 樣式維護
- 使用 Tailwind CSS 進行樣式管理
- 遵循設計系統的顏色和間距規範
- 響應式設計確保在不同設備上的良好體驗

### 性能優化
- 使用 React.memo 優化組件重渲染
- 實現虛擬滾動處理大量數據
- 懶加載非關鍵組件

### 錯誤處理
- 網絡請求錯誤的友好提示
- 數據載入失敗的降級處理
- 用戶操作的驗證和反饋

## 測試建議

### 單元測試
- 組件渲染測試
- 用戶交互測試
- 數據處理邏輯測試

### 集成測試
- 組件間通信測試
- 數據流測試
- 端到端用戶流程測試

## 版本歷史

- **v1.0.0**: 初始版本，包含基本產品列表和訂單記錄功能
- 支持產品排序和選擇
- 實現歷史訂單記錄展示
- 添加頁面過渡動畫效果 