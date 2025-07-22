"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import ModuleTabs from "../components/module-tabs"
import ProductList from "../components/product-list"
import ProductOrders from "../components/product-orders"
import ProductEditForm from "../components/product-edit-form"
import { ProductService, type Product, type ProductOrder } from "../lib/product-service"

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("products")
  const [selectedProduct, setSelectedProduct] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [products, setProducts] = useState<Product[]>([])
  const [productOrders, setProductOrders] = useState<ProductOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [pageOpacity, setPageOpacity] = useState(0)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // 標籤配置
  const tabs = [
    { id: "products", label: "產品列表" },
    { id: "orders", label: "訂製單記錄" }
  ]

  // 獲取當前日期時間
  const getCurrentDateTime = () => {
    const now = new Date()
    const year = now.getFullYear() - 1911 // 民國年
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${year} / ${month} / ${day} ${hours}:${minutes}`
  }

  // 初始化載入產品數據
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await ProductService.getAllProducts()
        const sortedProducts = await ProductService.sortProducts(productsData, sortBy)
        setProducts(sortedProducts)
        // 不自動選擇第一個產品，讓用戶主動選擇
      } catch (error) {
        console.error("載入產品數據失敗:", error)
      } finally {
        setLoading(false)
        // 數據載入完成後開始淡入
        setTimeout(() => setPageOpacity(1), 50)
      }
    }

    loadProducts()
  }, []) // 只在組件掛載時執行一次

  // 處理排序變更
  const handleSortChange = async (newSortBy: string) => {
    setSortBy(newSortBy)
    const sortedProducts = await ProductService.sortProducts(products, newSortBy)
    setProducts(sortedProducts)
    // 注意：這裡不改變 selectedProduct，保持用戶當前選擇的產品
  }

  // 處理編輯按鈕點擊
  const handleEditClick = (product: Product) => {
    setEditingProduct(product)
    setIsEditing(true)
  }

  // 處理保存編輯
  const handleSaveEdit = async (updatedProduct: Product) => {
    try {
      // 調用服務更新產品，傳遞原始ID以處理ID變更
      const originalId = editingProduct?.id
      const savedProduct = await ProductService.updateProduct(updatedProduct, originalId)
      
      // 更新本地產品列表
      const updatedProducts = products.map(p => 
        p.id === originalId ? savedProduct : p
      )
      setProducts(updatedProducts)
      
      // 如果編輯的是當前選中的產品，更新選中狀態
      if (selectedProduct === originalId) {
        setSelectedProduct(savedProduct.id)
      }
      
      // 關閉編輯模式
      setIsEditing(false)
      setEditingProduct(null)
    } catch (error) {
      console.error("保存產品失敗:", error)
    }
  }

  // 處理取消編輯
  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingProduct(null)
  }

  // 當選擇的產品改變時，載入對應的歷史訂單
  useEffect(() => {
    const loadProductOrders = async () => {
      if (selectedProduct) {
        try {
          const orders = await ProductService.getProductOrders(selectedProduct)
          setProductOrders(orders)
        } catch (error) {
          console.error("載入產品訂單失敗:", error)
        }
      }
    }

    loadProductOrders()
  }, [selectedProduct])

  if (loading) {
    return (
      <div className="middle-col-outer-wrap flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="middle-col-outer-wrap flex-1 transition-all duration-300 ease-in-out"
      style={{ opacity: pageOpacity }}
    >
      {/* Header */}
      <div className="bg-gray-600 text-white px-6 py-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm">
            <span>業務課</span>
            <span>{">"}</span>
            <span>產品資訊</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>{getCurrentDateTime()}</span>
          </div>
        </div>
      </div>

      {/* Module Tabs */}
      {/* <ModuleTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
      /> */}

      {/* Main Content Area */}
      <div className="flex">
        {/* Left Content */}
        <div className="flex-1">
          {/* Product List Section */}
          <ProductList
            products={products}
            selectedProduct={selectedProduct}
            sortBy={sortBy}
            onProductSelect={setSelectedProduct}
            onSortChange={handleSortChange}
            onEditClick={handleEditClick}
            isEditing={isEditing}
            editingProductId={editingProduct?.id || ""}
          />

          {/* Product Orders Section - 只在選擇產品後顯示 */}
          {selectedProduct && (
            <ProductOrders
              productId={selectedProduct}
              orders={productOrders}
            />
          )}
        </div>

        {/* Right Edit Panel */}
        {isEditing && (
          <ProductEditForm
            product={editingProduct}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        )}
      </div>
    </div>
  )
} 