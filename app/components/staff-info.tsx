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
      
      // 擷取印刷課的資料
      const printingSpecs: Array<{
        id: string;
        orderNumber: string;
        createdAt: string;
        moduleNumber: string;
        printing: {
          colors: string;
          sides: string;
        };
        circumference: string;
        plateLength: string;
        barcode: string;
        material: {
          type: string;
          supplier: string;
          material: string;
          thickness: string;
          width: string;
        };
        quantity: {
          meters: string;
          rolls: string;
          kgs: string;
          kgsRolls: string;
        };
        ink: string[];
        position: {
          type: string;
          distance: string;
          other: string;
        };
        windingDirection: {
          type: string;
          value: string;
        };
        otherConditions: string;
      }> = []
      
      // 擷取貼合課的資料
      const laminationSpecs: Array<{
        id: string;
        orderNumber: string;
        createdAt: string;
        moduleNumber: string;
        materialA: {
          type: string;
          value: string;
          thickness: string;
          width: string;
          quantity: {
            meters: string;
            rolls: string;
            kgs: string;
            kgsRolls: string;
          };
        };
        materialB: {
          type: string;
          value: string;
          thickness: string;
          width: string;
          quantity: {
            meters: string;
            rolls: string;
            kgs: string;
            kgsRolls: string;
          };
        };
        otherConditions: string;
      }> = []
      
      // 擷取分條課的資料
      const slittingSpecs: Array<{
        id: string;
        orderNumber: string;
        createdAt: string;
        moduleNumber: string;
        material: string;
        stage1: {
          type: string;
          size: string;
          quantity: {
            meters: string;
            rolls: string;
          };
        };
        stage2: {
          type: string;
          size: string;
          quantity: {
            meters: string;
            rolls: string;
          };
        };
        windingDirection: {
          type: string;
          value: string;
        };
        cornerFolding: {
          bagWidth: string;
          faceWidth: string;
          fold: string;
          oneSideFold: string;
          quantity: string;
        };
        otherConditions: string;
      }> = []
      
      // 擷取裁袋課的資料
      const cuttingSpecs: Array<{
        id: string;
        orderNumber: string;
        createdAt: string;
        moduleNumber: string;
        bagType: string;
        bagType2: string;
        printingPattern: string;
        bagLength: string;
        quantity: {
          amount: string;
          unit: string;
        };
        smallPackage: {
          amount: string;
          unit: string;
        };
        largePackage: {
          amount: string;
          unit: string;
        };
        tapeColor: {
          type: string;
          value: string;
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
        
        // 檢查是否為印刷課的元件
        const isPrinting = element.querySelector('.bg-bag-printing')
        if (isPrinting) {
          // 擷取創建時間
          const createdAtElement = element.querySelector('.text-xs.text-gray-600 span')
          const createdAt = createdAtElement ? createdAtElement.textContent?.replace('創建時間：', '') : ''
          
          // 擷取模組編號
          const moduleNumberElement = element.querySelector('.text-wrap-vertical div:last-child')
          const moduleNumber = moduleNumberElement ? moduleNumberElement.textContent : '01'
          
          // 擷取印刷色數和面數
          const colorsInput = element.querySelector('input[placeholder="2"]') as HTMLInputElement
          const sidesInput = element.querySelectorAll('input[placeholder=""]')[0] as HTMLInputElement
          
          // 擷取圓周
          const circumferenceInput = element.querySelectorAll('input[placeholder=""]')[1] as HTMLInputElement
          
          // 擷取版長
          const plateLengthInput = element.querySelectorAll('input[placeholder=""]')[2] as HTMLInputElement
          
          // 擷取條碼
          const barcodeInput = element.querySelector('input[placeholder="4712425028076"]') as HTMLInputElement
          
          // 擷取料膜類型
          const materialTypeSelect = element.querySelectorAll('button[role="combobox"] span')[0] as HTMLElement
          
          // 擷取外購廠商名稱
          const supplierInput = element.querySelectorAll('input[placeholder=""]')[3] as HTMLInputElement
          
          // 擷取材質
          const materialSelect = element.querySelectorAll('button[role="combobox"] span')[1] as HTMLElement
          const materialInput = element.querySelector('input[placeholder="填值"]') as HTMLInputElement
          
          // 擷取厚度
          const thicknessInput = element.querySelectorAll('input[placeholder=""]')[4] as HTMLInputElement
          
          // 擷取膜寬
          const widthInput = element.querySelectorAll('input[placeholder=""]')[5] as HTMLInputElement
          
          // 擷取數量 - 米數和卷數
          const metersInput = element.querySelector('input[placeholder="3000"]') as HTMLInputElement
          const rollsInput = element.querySelectorAll('input[placeholder=""]')[6] as HTMLInputElement
          
          // 擷取數量 - 公斤和卷數
          const kgsInput = element.querySelectorAll('input[placeholder=""]')[7] as HTMLInputElement
          const kgsRollsInput = element.querySelectorAll('input[placeholder=""]')[8] as HTMLInputElement
          
          // 擷取油墨 (6個輸入框)
          const inkInputs = element.querySelectorAll('input[placeholder="特桔"], input[placeholder="黑"], input[placeholder=""]')
          const ink: string[] = []
          inkInputs.forEach((input, i) => {
            if (i < 6) { // 只取前6個
              ink.push((input as HTMLInputElement)?.value || '')
            }
          })
          
          // 擷取位置
          const positionSelect = element.querySelectorAll('button[role="combobox"] span')[2] as HTMLElement
          const positionDistanceInput = element.querySelectorAll('input[placeholder=""]')[9] as HTMLInputElement
          const positionOtherInput = element.querySelectorAll('input[placeholder=""]')[10] as HTMLInputElement
          
          // 擷取捲收方向
          const windingSelect = element.querySelectorAll('button[role="combobox"] span')[3] as HTMLElement
          const windingInput = element.querySelectorAll('input[placeholder="填值"]')[1] as HTMLInputElement
          
          // 擷取其他生產條件
          const otherConditionsElement = element.querySelector('.bg-gray-100 .text-sm')
          const otherConditions = otherConditionsElement ? otherConditionsElement.textContent : ''
          
          const printingSpec = {
            id: `printing-${orderNumber || 'K01140414001'}-${moduleNumber || '01'}`,
            orderNumber: orderNumber || 'K01140414001',
            createdAt: createdAt || '',
            moduleNumber: moduleNumber || '01',
            printing: {
              colors: colorsInput?.value || '',
              sides: sidesInput?.value || ''
            },
            circumference: circumferenceInput?.value || '',
            plateLength: plateLengthInput?.value || '',
            barcode: barcodeInput?.value || '',
            material: {
              type: materialTypeSelect?.textContent || '',
              supplier: supplierInput?.value || '',
              material: materialSelect?.textContent || '',
              thickness: thicknessInput?.value || '',
              width: widthInput?.value || ''
            },
            quantity: {
              meters: metersInput?.value || '',
              rolls: rollsInput?.value || '',
              kgs: kgsInput?.value || '',
              kgsRolls: kgsRollsInput?.value || ''
            },
            ink: ink,
            position: {
              type: positionSelect?.textContent || '',
              distance: positionDistanceInput?.value || '',
              other: positionOtherInput?.value || ''
            },
            windingDirection: {
              type: windingSelect?.textContent || '',
              value: windingInput?.value || ''
            },
            otherConditions: otherConditions || ''
          }
          
          printingSpecs.push(printingSpec)
        }
        
        // 檢查是否為貼合課的元件
        const isLamination = element.querySelector('.bg-bag-lamination')
        if (isLamination) {
          // 擷取創建時間
          const createdAtElement = element.querySelector('.text-xs.text-gray-600 span')
          const createdAt = createdAtElement ? createdAtElement.textContent?.replace('創建時間：', '') : ''
          
          // 擷取模組編號
          const moduleNumberElement = element.querySelector('.text-wrap-vertical div:last-child')
          const moduleNumber = moduleNumberElement ? moduleNumberElement.textContent : '01'
          
          // 擷取料膜A相關資料
          const materialATypeSelect = element.querySelectorAll('button[role="combobox"] span')[0] as HTMLElement
          const materialAValueInput = element.querySelectorAll('input[placeholder=""]')[0] as HTMLInputElement
          const materialAThicknessInput = element.querySelectorAll('input[placeholder=""]')[1] as HTMLInputElement
          const materialAWidthInput = element.querySelectorAll('input[placeholder=""]')[2] as HTMLInputElement
          const materialAMetersInput = element.querySelectorAll('input[placeholder=""]')[3] as HTMLInputElement
          const materialARollsInput = element.querySelectorAll('input[placeholder=""]')[4] as HTMLInputElement
          const materialAKgsInput = element.querySelectorAll('input[placeholder=""]')[5] as HTMLInputElement
          const materialAKgsRollsInput = element.querySelectorAll('input[placeholder=""]')[6] as HTMLInputElement
          
          // 擷取料膜B相關資料
          const materialBTypeSelect = element.querySelectorAll('button[role="combobox"] span')[1] as HTMLElement
          const materialBValueInput = element.querySelectorAll('input[placeholder=""]')[7] as HTMLInputElement
          const materialBThicknessInput = element.querySelectorAll('input[placeholder=""]')[8] as HTMLInputElement
          const materialBWidthInput = element.querySelectorAll('input[placeholder=""]')[9] as HTMLInputElement
          const materialBMetersInput = element.querySelectorAll('input[placeholder=""]')[10] as HTMLInputElement
          const materialBRollsInput = element.querySelectorAll('input[placeholder=""]')[11] as HTMLInputElement
          const materialBKgsInput = element.querySelectorAll('input[placeholder=""]')[12] as HTMLInputElement
          const materialBKgsRollsInput = element.querySelectorAll('input[placeholder=""]')[13] as HTMLInputElement
          
          // 擷取其他生產條件
          const otherConditionsElement = element.querySelector('.bg-gray-100 .text-sm')
          const otherConditions = otherConditionsElement ? otherConditionsElement.textContent : ''
          
          const laminationSpec = {
            id: `lamination-${orderNumber || 'K01140414001'}-${moduleNumber || '01'}`,
            orderNumber: orderNumber || 'K01140414001',
            createdAt: createdAt || '',
            moduleNumber: moduleNumber || '01',
            materialA: {
              type: materialATypeSelect?.textContent || '',
              value: materialAValueInput?.value || '',
              thickness: materialAThicknessInput?.value || '',
              width: materialAWidthInput?.value || '',
              quantity: {
                meters: materialAMetersInput?.value || '',
                rolls: materialARollsInput?.value || '',
                kgs: materialAKgsInput?.value || '',
                kgsRolls: materialAKgsRollsInput?.value || ''
              }
            },
            materialB: {
              type: materialBTypeSelect?.textContent || '',
              value: materialBValueInput?.value || '',
              thickness: materialBThicknessInput?.value || '',
              width: materialBWidthInput?.value || '',
              quantity: {
                meters: materialBMetersInput?.value || '',
                rolls: materialBRollsInput?.value || '',
                kgs: materialBKgsInput?.value || '',
                kgsRolls: materialBKgsRollsInput?.value || ''
              }
            },
            otherConditions: otherConditions || ''
          }
          
          laminationSpecs.push(laminationSpec)
        }
        
        // 檢查是否為分條課的元件
        const isSlitting = element.querySelector('.bg-bag-slitting')
        if (isSlitting) {
          // 擷取創建時間
          const createdAtElement = element.querySelector('.text-xs.text-gray-600 span')
          const createdAt = createdAtElement ? createdAtElement.textContent?.replace('創建時間：', '') : ''
          
          // 擷取模組編號
          const moduleNumberElement = element.querySelector('.text-wrap-vertical div:last-child')
          const moduleNumber = moduleNumberElement ? moduleNumberElement.textContent : '01'
          
          // 擷取料膜
          const materialInput = element.querySelectorAll('input[placeholder=""]')[0] as HTMLInputElement
          
          // 擷取工段(一)相關資料
          const stage1TypeSelect = element.querySelectorAll('button[role="combobox"] span')[0] as HTMLElement
          const stage1SizeInput = element.querySelectorAll('input[placeholder=""]')[1] as HTMLInputElement
          const stage1MetersInput = element.querySelectorAll('input[placeholder=""]')[2] as HTMLInputElement
          const stage1RollsInput = element.querySelectorAll('input[placeholder=""]')[3] as HTMLInputElement
          
          // 擷取工段(二)相關資料
          const stage2TypeSelect = element.querySelectorAll('button[role="combobox"] span')[1] as HTMLElement
          const stage2SizeInput = element.querySelectorAll('input[placeholder=""]')[4] as HTMLInputElement
          const stage2MetersInput = element.querySelectorAll('input[placeholder=""]')[5] as HTMLInputElement
          const stage2RollsInput = element.querySelectorAll('input[placeholder=""]')[6] as HTMLInputElement
          
          // 擷取捲收方向
          const windingSelect = element.querySelectorAll('button[role="combobox"] span')[2] as HTMLElement
          const windingInput = element.querySelector('input[placeholder="填值"]') as HTMLInputElement
          
          // 擷取折角相關資料
          const bagWidthInput = element.querySelectorAll('input[placeholder=""]')[7] as HTMLInputElement
          const faceWidthInput = element.querySelectorAll('input[placeholder=""]')[8] as HTMLInputElement
          const foldInput = element.querySelectorAll('input[placeholder=""]')[9] as HTMLInputElement
          const oneSideFoldInput = element.querySelectorAll('input[placeholder=""]')[10] as HTMLInputElement
          const quantityInput = element.querySelectorAll('input[placeholder=""]')[11] as HTMLInputElement
          
          // 擷取其他生產條件
          const otherConditionsElement = element.querySelector('.bg-gray-100 .text-sm')
          const otherConditions = otherConditionsElement ? otherConditionsElement.textContent : ''
          
          const slittingSpec = {
            id: `slitting-${orderNumber || 'K01140414001'}-${moduleNumber || '01'}`,
            orderNumber: orderNumber || 'K01140414001',
            createdAt: createdAt || '',
            moduleNumber: moduleNumber || '01',
            material: materialInput?.value || '',
            stage1: {
              type: stage1TypeSelect?.textContent || '',
              size: stage1SizeInput?.value || '',
              quantity: {
                meters: stage1MetersInput?.value || '',
                rolls: stage1RollsInput?.value || ''
              }
            },
            stage2: {
              type: stage2TypeSelect?.textContent || '',
              size: stage2SizeInput?.value || '',
              quantity: {
                meters: stage2MetersInput?.value || '',
                rolls: stage2RollsInput?.value || ''
              }
            },
            windingDirection: {
              type: windingSelect?.textContent || '',
              value: windingInput?.value || ''
            },
            cornerFolding: {
              bagWidth: bagWidthInput?.value || '',
              faceWidth: faceWidthInput?.value || '',
              fold: foldInput?.value || '',
              oneSideFold: oneSideFoldInput?.value || '',
              quantity: quantityInput?.value || ''
            },
            otherConditions: otherConditions || ''
          }
          
          slittingSpecs.push(slittingSpec)
        }
        
        // 檢查是否為裁袋課的元件
        const isCutting = element.querySelector('.bg-bag-cutting')
        if (isCutting) {
          // 擷取創建時間
          const createdAtElement = element.querySelector('.text-xs.text-gray-600 span')
          const createdAt = createdAtElement ? createdAtElement.textContent?.replace('創建時間：', '') : ''
          
          // 擷取模組編號
          const moduleNumberElement = element.querySelector('.text-wrap-vertical div:last-child')
          const moduleNumber = moduleNumberElement ? moduleNumberElement.textContent : '01'
          
          // 擷取袋型
          const bagTypeSelect = element.querySelectorAll('button[role="combobox"] span')[0] as HTMLElement
          const bagType2Select = element.querySelectorAll('button[role="combobox"] span')[1] as HTMLElement
          
          // 擷取印刷圖面
          const printingPatternSelect = element.querySelectorAll('button[role="combobox"] span')[2] as HTMLElement
          const bagLengthInput = element.querySelectorAll('input[placeholder=""]')[0] as HTMLInputElement
          
          // 擷取數量
          const quantityInput = element.querySelectorAll('input[placeholder=""]')[1] as HTMLInputElement
          const quantityUnitSelect = element.querySelectorAll('button[role="combobox"] span')[3] as HTMLElement
          
          // 擷取小包裝數量
          const smallPackageInput = element.querySelectorAll('input[placeholder=""]')[2] as HTMLInputElement
          const smallPackageUnitSelect = element.querySelectorAll('button[role="combobox"] span')[4] as HTMLElement
          
          // 擷取大包裝數量
          const largePackageInput = element.querySelectorAll('input[placeholder=""]')[3] as HTMLInputElement
          const largePackageUnitSelect = element.querySelectorAll('button[role="combobox"] span')[5] as HTMLElement
          
          // 擷取膠帶顏色
          const tapeColorSelect = element.querySelectorAll('button[role="combobox"] span')[6] as HTMLElement
          const tapeColorInput = element.querySelector('input[placeholder="填值"]') as HTMLInputElement
          
          // 擷取其他生產條件
          const otherConditionsElement = element.querySelector('.bg-gray-100 .text-sm')
          const otherConditions = otherConditionsElement ? otherConditionsElement.textContent : ''
          
          const cuttingSpec = {
            id: `cutting-${orderNumber || 'K01140414001'}-${moduleNumber || '01'}`,
            orderNumber: orderNumber || 'K01140414001',
            createdAt: createdAt || '',
            moduleNumber: moduleNumber || '01',
            bagType: bagTypeSelect?.textContent || '',
            bagType2: bagType2Select?.textContent || '',
            printingPattern: printingPatternSelect?.textContent || '',
            bagLength: bagLengthInput?.value || '',
            quantity: {
              amount: quantityInput?.value || '',
              unit: quantityUnitSelect?.textContent || ''
            },
            smallPackage: {
              amount: smallPackageInput?.value || '',
              unit: smallPackageUnitSelect?.textContent || ''
            },
            largePackage: {
              amount: largePackageInput?.value || '',
              unit: largePackageUnitSelect?.textContent || ''
            },
            tapeColor: {
              type: tapeColorSelect?.textContent || '',
              value: tapeColorInput?.value || ''
            },
            otherConditions: otherConditions || ''
          }
          
          cuttingSpecs.push(cuttingSpec)
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
        printing: printingSpecs,
        lamination: laminationSpecs,
        slitting: slittingSpecs,
        cutting: cuttingSpecs,
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