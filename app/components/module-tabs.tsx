"use client"

interface ModuleTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
  tabs: { id: string; label: string }[]
}

export default function ModuleTabs({
  activeTab,
  onTabChange,
  tabs
}: ModuleTabsProps) {
  return (
    <div className="px-6 mb-6">
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
} 