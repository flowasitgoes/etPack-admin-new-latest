export interface ProductionSpecConfig {
  type: 'bag' | 'printing' | 'lamination' | 'slitting' | 'cutting'
  title: string
  bgColor: string
  borderColor: string
  iconColor: string
}

export const productionSpecConfigs: ProductionSpecConfig[] = [
  {
    type: 'bag',
    title: '抽袋',
    bgColor: 'bg-bag-drawing',
    borderColor: 'border-pink-200',
    iconColor: 'text-pink-400'
  },
  {
    type: 'printing',
    title: '印刷',
    bgColor: 'bg-bag-printing',
    borderColor: 'border-blue-200',
    iconColor: 'text-[#9ccee4]'
  },
  {
    type: 'lamination',
    title: '貼合',
    bgColor: 'bg-bag-lamination',
    borderColor: 'border-[#e4b49c]',
    iconColor: 'text-[#e4b49c]'
  },
  {
    type: 'slitting',
    title: '分條',
    bgColor: 'bg-bag-slitting',
    borderColor: 'border-[#87bf8d]',
    iconColor: 'text-[#87bf8d]'
  },
  {
    type: 'cutting',
    title: '裁袋',
    bgColor: 'bg-bag-cutting',
    borderColor: 'border-yellow-400',
    iconColor: 'text-[rgb(188 171 103)]'
  }
]

export function getProductionSpecConfig(type: string): ProductionSpecConfig | undefined {
  return productionSpecConfigs.find(config => config.type === type)
}
