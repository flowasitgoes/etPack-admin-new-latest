"use client"

import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function StaffInfo() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // 擷取訂單編號 - 修正選擇器
      const orderNumberElement = document.querySelector('.order-header-wrap .bg-theme-gray span')
      const orderNumber = orderNumberElement ? orderNumberElement.textContent?.replace('訂單編號 ', '') : ''
      
      // 擷取日期 - 修正選擇器
      const dateElement = document.querySelector('.order-header-wrap .px-6 .text-sm')
      const date = dateElement ? dateElement.textContent?.replace('日期: ', '') : ''
      
      // 擷取表單欄位
      const customerNameInput = document.querySelector('input[placeholder="輸入客戶名稱"]') as HTMLInputElement
      const customerCodeInput = document.querySelector('input[placeholder="輸入編號"]') as HTMLInputElement
      const productCodeInput = document.querySelector('input[placeholder="輸入產品編號"]') as HTMLInputElement
      const productNameInput = document.querySelector('input[placeholder="輸入品名"]') as HTMLInputElement
      const orderQuantityInput = document.querySelector('input[placeholder="輸入數量"]') as HTMLInputElement
      const orderQuantity2Input = document.querySelectorAll('input[placeholder="輸入數量"]')[1] as HTMLInputElement
      const deliveryDateInput = document.querySelector('input[placeholder="輸入交貨日期"]') as HTMLInputElement
      const formulaNumberInput = document.querySelector('input[placeholder="輸入配方編號"]') as HTMLInputElement
      const sampleFileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      
      // 擷取下拉選單的值
      const orderUnit1Select = document.querySelector('button[role="combobox"] span') as HTMLElement
      const orderUnit2Select = document.querySelectorAll('button[role="combobox"] span')[1] as HTMLElement
      
      // 擷取抽袋課的資料
      const baggingSpecs: Array<{
        id: string;
        orderNumber: string;
        createdAt: string;
        moduleNumber: string;
        thickness: string;
        width: string;
        cornerFolding: {
          totalWidth: string;
          face: string;
          fold: string;
          oneSideFold: string;
        };
        formula: string;
        dyeing: {
          type: string;
          value: string;
        };
        processing: {
          type: string;
          value: string;
        };
        cutting: {
          type: string;
          value: string;
        };
        trimming: {
          type: string;
          value: string;
        };
        printing: {
          print: string;
          color: string;
          plateLength: string;
          circumference: string;
        };
        otherConditions: string;
      }> = []
      const baggingElements = document.querySelectorAll('.production-specifications-item')
      
      baggingElements.forEach((element, index) => {
        // 檢查是否為抽袋課的元件
        const isBagging = element.querySelector('.bg-bag-drawing')
        if (isBagging) {
          // 擷取創建時間
          const createdAtElement = element.querySelector('.text-xs.text-gray-600 span')
          const createdAt = createdAtElement ? createdAtElement.textContent?.replace('創建時間：', '') : ''
          
          // 擷取模組編號
          const moduleNumberElement = element.querySelector('.text-wrap-vertical div:last-child')
          const moduleNumber = moduleNumberElement ? moduleNumberElement.textContent : '01'
          
          // 擷取厚度
          const thicknessInput = element.querySelector('input[placeholder=""]') as HTMLInputElement
          
          // 擷取寬度
          const widthInput = element.querySelectorAll('input[placeholder=""]')[1] as HTMLInputElement
          
          // 擷取連結折角 - 總寬
          const totalWidthInput = element.querySelectorAll('input[placeholder=""]')[2] as HTMLInputElement
          const faceInput = element.querySelectorAll('input[placeholder=""]')[3] as HTMLInputElement
          const foldInput = element.querySelectorAll('input[placeholder=""]')[4] as HTMLInputElement
          const oneSideFoldInput = element.querySelectorAll('input[placeholder=""]')[5] as HTMLInputElement
          
          // 擷取配方
          const formulaElement = element.querySelector('.text-sm')
          const formula = formulaElement ? formulaElement.textContent : ''
          
          // 擷取染色相關
          const dyeingSelect = element.querySelectorAll('button[role="combobox"] span')[0] as HTMLElement
          const dyeingInput = element.querySelector('input[placeholder="填值"]') as HTMLInputElement
          
          // 擷取處理相關
          const processingSelect = element.querySelectorAll('button[role="combobox"] span')[1] as HTMLElement
          const processingInput = element.querySelectorAll('input[placeholder="填值"]')[1] as HTMLInputElement
          
          // 擷取剖邊收捲相關
          const cuttingSelect = element.querySelectorAll('button[role="combobox"] span')[2] as HTMLElement
          const cuttingInput = element.querySelectorAll('input[placeholder="填值"]')[2] as HTMLInputElement
          
          // 擷取修邊相關
          const trimmingSelect = element.querySelectorAll('button[role="combobox"] span')[3] as HTMLElement
          const trimmingInput = element.querySelectorAll('input[placeholder="填值"]')[3] as HTMLInputElement
          
          // 擷取連結印刷相關
          const printingInput = element.querySelectorAll('input[placeholder=""]')[6] as HTMLInputElement
          const colorInput = element.querySelectorAll('input[placeholder=""]')[7] as HTMLInputElement
          const plateLengthInput = element.querySelectorAll('input[placeholder=""]')[8] as HTMLInputElement
          const circumferenceInput = element.querySelectorAll('input[placeholder=""]')[9] as HTMLInputElement
          
          // 擷取其他生產條件
          const otherConditionsElement = element.querySelector('.bg-gray-100 .text-sm')
          const otherConditions = otherConditionsElement ? otherConditionsElement.textContent : ''
          
          const baggingSpec = {
            id: `bag-${orderNumber || 'K01140414001'}-${moduleNumber || '01'}`,
            orderNumber: orderNumber || 'K01140414001',
            createdAt: createdAt || '',
            moduleNumber: moduleNumber || '01',
            thickness: thicknessInput?.value || '',
            width: widthInput?.value || '',
            cornerFolding: {
              totalWidth: totalWidthInput?.value || '',
              face: faceInput?.value || '',
              fold: foldInput?.value || '',
              oneSideFold: oneSideFoldInput?.value || ''
            },
            formula: formula || '',
            dyeing: {
              type: dyeingSelect?.textContent || '',
              value: dyeingInput?.value || ''
            },
            processing: {
              type: processingSelect?.textContent || '',
              value: processingInput?.value || ''
            },
            cutting: {
              type: cuttingSelect?.textContent || '',
              value: cuttingInput?.value || ''
            },
            trimming: {
              type: trimmingSelect?.textContent || '',
              value: trimmingInput?.value || ''
            },
            printing: {
              print: printingInput?.value || '',
              color: colorInput?.value || '',
              plateLength: plateLengthInput?.value || '',
              circumference: circumferenceInput?.value || ''
            },
            otherConditions: otherConditions || ''
          }
          
          baggingSpecs.push(baggingSpec)
        }
      })
      
      // 準備要儲存的數據
      const orderData = {
        orderNumber: orderNumber || 'K01140414001',
        date: date || '114/03/20',
        orderInfo: {
          customerName: customerNameInput?.value || '',
          customerCode: customerCodeInput?.value || '',
          productCode: productCodeInput?.value || '',
          productName: productNameInput?.value || '',
          orderQuantity: orderQuantityInput?.value || '',
          orderUnit1: orderUnit1Select?.textContent || '只',
          orderQuantity2: orderQuantity2Input?.value || '',
          orderUnit2: orderUnit2Select?.textContent || '箱',
          deliveryDate: deliveryDateInput?.value || '',
          formulaNumber: formulaNumberInput?.value || '',
          sampleFile: sampleFileInput?.files?.[0]?.name || ''
        },
        bagging: baggingSpecs,
        submittedAt: new Date().toISOString(),
        status: 'submitted'
      }
      
      // 發送 API 請求儲存檔案
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      })
      
      const result = await response.json()
      
      if (result.success) {
        console.log('訂單數據已儲存:', result)
        alert(`訂單數據已成功儲存到 order-data 資料夾！\n檔案名稱: ${result.fileName}`)
      } else {
        throw new Error(result.message)
      }
      
    } catch (error) {
      console.error('儲存訂單數據時發生錯誤:', error)
      alert('儲存訂單數據時發生錯誤，請重試。')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="admin-right-col-section w-64 bg-gray-50 p-6 shadow-[-4px_0_8px_rgba(0,0,0,0.1)]" style={{ position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
      <div className="flex flex-col h-full">
        <div className="space-y-6 flex-1">
          {/* Order Creator */}
          <div className="right-col-item text-center">
            <div className="bg-gray-200 px-4 py-2 border-br-bl-none rounded-lg mb-4 font-medium">製單</div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center mx-auto mb-2">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="text-sm font-medium">陳某某</div>
          </div>

          {/* Manager */}
          <div className="right-col-item text-center">
            <div className="bg-gray-200 px-4 py-2 border-br-bl-none rounded-lg mb-4 font-medium">經理</div>
            <div className="w-16 h-16 rounded-full bg-theme-gray flex items-center justify-center mx-auto mb-2">
              <User className="w-8 h-8 text-gray-500" />
            </div>
          </div>

          {/* General Manager */}
          <div className="right-col-item text-center">
            <div className="bg-gray-200 px-4 py-2 border-br-bl-none rounded-lg mb-4 font-medium">總經理</div>
            <div className="w-16 h-16 rounded-full bg-theme-gray flex items-center justify-center mx-auto mb-2">
              <User className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-auto pt-6">
          <Button 
            className="w-full bg-primary-dark hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 text-white py-3 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? '處理中...' : '確認送出'}
          </Button>
        </div>
      </div>
    </div>
  )
} 