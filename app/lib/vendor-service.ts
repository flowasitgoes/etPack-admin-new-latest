export interface Vendor {
  id: string
  name: string
  vendorId: string
  address: {
    country: string
    city: string
    district: string
    village: string
    detail: string
  }
  phone: string
  contactPerson: {
    name: string
    title: string
    phone: string
  }
}

export interface VendorOrder {
  id: string
  vendorId: string
  orderDate: string
  deliveryDate: string
  orderSummary: string
  remarks: string
}

// 模擬客戶數據
const mockVendors: Vendor[] = [
  {
    id: "V001",
    name: "驚奇股份有限公司",
    vendorId: "V001",
    address: {
      country: "國內",
      city: "台北市",
      district: "中正區",
      village: "中正里",
      detail: "重慶南路一段1號"
    },
    phone: "02-23896888",
    contactPerson: {
      name: "陳小姐",
      title: "採購專員",
      phone: "02-23896888"
    }
  },
  {
    id: "V002", 
    name: "全聯",
    vendorId: "V002",
    address: {
      country: "國內",
      city: "台北市",
      district: "大安區",
      village: "大安里",
      detail: "復興南路一段390號"
    },
    phone: "02-27008888",
    contactPerson: {
      name: "林先生",
      title: "採購經理",
      phone: "02-27008888"
    }
  },
  {
    id: "V003",
    name: "大潤發百貨",
    vendorId: "V003",
    address: {
      country: "國內",
      city: "新北市",
      district: "板橋區",
      village: "板橋里",
      detail: "文化路一段100號"
    },
    phone: "02-29688888",
    contactPerson: {
      name: "蔡小姐",
      title: "採購專員",
      phone: "02-29688888"
    }
  }
]

// 模擬客戶歷史訂單數據
const mockVendorOrders: VendorOrder[] = [
  {
    id: "O001",
    vendorId: "V001",
    orderDate: "114/05/31",
    deliveryDate: "114/07/01",
    orderSummary: "電子零件一批",
    remarks: ""
  },
  {
    id: "O002",
    vendorId: "V001",
    orderDate: "114/03/15",
    deliveryDate: "114/04/15",
    orderSummary: "機械設備",
    remarks: ""
  },
  {
    id: "O003",
    vendorId: "V001",
    orderDate: "113/10/05",
    deliveryDate: "113/10/15",
    orderSummary: "辦公用品",
    remarks: ""
  },
  {
    id: "O004",
    vendorId: "V001",
    orderDate: "113/02/18",
    deliveryDate: "113/03/05",
    orderSummary: "包裝材料",
    remarks: ""
  },
  {
    id: "O005",
    vendorId: "V002",
    orderDate: "114/06/15",
    deliveryDate: "114/07/15",
    orderSummary: "食品原料",
    remarks: ""
  },
  {
    id: "O006",
    vendorId: "V002",
    orderDate: "114/04/20",
    deliveryDate: "114/05/20",
    orderSummary: "清潔用品",
    remarks: ""
  },
  {
    id: "O007",
    vendorId: "V003",
    orderDate: "114/05/10",
    deliveryDate: "114/06/10",
    orderSummary: "百貨商品",
    remarks: ""
  }
]

export class VendorService {
  // 獲取所有客戶
  static async getAllVendors(): Promise<Vendor[]> {
    // 模擬API延遲
    await new Promise(resolve => setTimeout(resolve, 500))
    return [...mockVendors]
  }

  // 根據名稱排序客戶
  static async sortVendors(vendors: Vendor[], sortBy: string): Promise<Vendor[]> {
    const sortedVendors = [...vendors]
    
    if (sortBy === "name") {
      sortedVendors.sort((a, b) => a.name.localeCompare(b.name, 'zh-TW'))
    } else if (sortBy === "id") {
      sortedVendors.sort((a, b) => a.id.localeCompare(b.id))
    } else if (sortBy === "vendorId") {
      sortedVendors.sort((a, b) => a.vendorId.localeCompare(b.vendorId))
    }
    
    return sortedVendors
  }

  // 獲取客戶歷史訂單
  static async getVendorOrders(vendorId: string): Promise<VendorOrder[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockVendorOrders.filter(order => order.vendorId === vendorId)
  }

  // 更新客戶信息
  static async updateVendor(vendor: Vendor, originalId?: string): Promise<Vendor> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = mockVendors.findIndex(v => v.id === (originalId || vendor.id))
    if (index !== -1) {
      mockVendors[index] = vendor
    }
    
    return vendor
  }

  // 添加新客戶
  static async addVendor(vendor: Vendor): Promise<Vendor> {
    await new Promise(resolve => setTimeout(resolve, 300))
    mockVendors.push(vendor)
    return vendor
  }

  // 創建新客戶 (與 addVendor 相同，但保持 API 一致性)
  static async createVendor(vendor: Vendor): Promise<Vendor> {
    return this.addVendor(vendor)
  }

  // 刪除客戶
  static async deleteVendor(vendorId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = mockVendors.findIndex(v => v.id === vendorId)
    if (index !== -1) {
      mockVendors.splice(index, 1)
    }
  }
} 