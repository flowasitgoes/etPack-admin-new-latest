# 配方資料庫模組

## 概述

配方資料庫模組是 ERP 系統的核心功能之一，用於管理產品配方信息和相關的歷史訂單記錄。

## 架構設計

### 目錄結構
```
app/formulas/
├── page.tsx              # 主頁面組件
└── README.md             # 模組說明文件

app/components/
├── formula-list.tsx      # 配方列表組件
├── historical-orders.tsx # 歷史訂單組件
└── module-tabs.tsx       # 模組標籤組件

app/lib/
└── formula-service.ts    # 配方數據服務層
```

### 組件架構

#### 1. 主頁面組件 (`page.tsx`)
- **職責**: 頁面狀態管理和數據協調
- **功能**:
  - 管理當前激活的標籤頁
  - 處理配方選擇和排序
  - 協調數據載入和狀態更新
  - 顯示載入狀態

#### 2. 配方列表組件 (`formula-list.tsx`)
- **職責**: 顯示配方列表和排序功能
- **功能**:
  - 顯示配方編號和配方名稱
  - 支持配方選擇
  - 提供排序選項（名稱排序、訂單排序）
  - 可滾動的配方列表

#### 3. 歷史訂單組件 (`historical-orders.tsx`)
- **職責**: 顯示選中配方的歷史訂單記錄
- **功能**:
  - 顯示客戶名稱、交貨日期、訂單數量、備註
  - 支持交替行背景色
  - 可滾動的訂單列表

#### 4. 模組標籤組件 (`module-tabs.tsx`)
- **職責**: 提供模組內標籤頁切換
- **功能**:
  - 配方列表 / 訂製單記錄標籤切換
  - 可重用的標籤組件

### 數據服務層 (`formula-service.ts`)

#### 數據類型定義
```typescript
interface Formula {
  id: string
  name: string
  variants: string[]
  description?: string
  createdAt: string
  updatedAt: string
}

interface HistoricalOrder {
  id: string
  formulaId: string
  vendor: string
  deliveryDate: string
  quantity: string
  notes: string
  orderDate: string
}
```

#### 服務方法
- `getAllFormulas()`: 獲取所有配方
- `getFormulaById(id)`: 根據 ID 獲取配方
- `getHistoricalOrders(formulaId)`: 獲取配方的歷史訂單
- `searchFormulas(query)`: 搜索配方
- `sortFormulas(formulas, sortBy)`: 排序配方

## 功能特性

### 1. 配方管理
- 配方列表顯示
- 配方選擇和切換
- 配方排序（按名稱、編號、日期）

### 2. 歷史訂單記錄
- 顯示選中配方的歷史訂單
- 包含客戶、交貨日期、數量、備註信息
- 支持滾動查看

### 3. 用戶界面
- 響應式設計
- 載入狀態指示
- 平滑的狀態轉換
- 直觀的交互反饋

### 4. 數據管理
- 模擬 API 服務
- 異步數據載入
- 錯誤處理
- 狀態管理

## 使用方式

1. **導航到配方資料庫**: 點擊左側導航欄的「配方資料庫」
2. **查看配方列表**: 在配方列表區域查看所有可用配方
3. **選擇配方**: 點擊配方行來選擇特定配方
4. **查看歷史訂單**: 選中配方後，下方會顯示該配方的歷史訂單記錄
5. **排序配方**: 使用右上角的排序按鈕來改變配方排序方式

## 擴展性

### 未來功能擴展
- 配方編輯功能
- 配方版本管理
- 配方搜索功能
- 配方匯出/匯入
- 配方權限管理

### 技術擴展
- 真實 API 整合
- 數據庫連接
- 緩存機制
- 離線支持

## 維護說明

### 添加新配方
在 `formula-service.ts` 的 `mockFormulas` 數組中添加新的配方對象。

### 修改數據結構
更新 `Formula` 或 `HistoricalOrder` 接口定義，並相應更新組件。

### 樣式調整
所有樣式都使用 Tailwind CSS 類，可以在組件中直接修改。 