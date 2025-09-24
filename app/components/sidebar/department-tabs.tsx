"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Department {
  id: string
  name: string
  shortName: string
  path: string
}

export default function DepartmentTabs() {
  const [activeDepartment, setActiveDepartment] = useState("business")
  const router = useRouter()

  // 課別資料
  const departments: Department[] = [
    { id: "business", name: "業務課", shortName: "業", path: "/" },
    { id: "extraction", name: "抽袋課", shortName: "抽", path: "/bagging" },
    { id: "printing", name: "印刷課", shortName: "印", path: "/printing" },
    { id: "laminating", name: "貼合課", shortName: "貼", path: "/laminating" },
    { id: "slitting", name: "分條課", shortName: "分", path: "/slitting" },
    { id: "cutting", name: "裁袋課", shortName: "裁", path: "/cutting" }
  ]

  const handleDepartmentClick = (deptId: string) => {
    setActiveDepartment(deptId)
    const department = departments.find(d => d.id === deptId)
    if (department) {
      router.push(department.path)
    }
  }

  return (
    <div className="p-4 border-b border-gray-200" style={{ minHeight: '95px' }}>
      <div className="grid grid-cols-3 gap-2">
        {departments.map((dept) => (
          <button
            key={dept.id}
            onClick={() => handleDepartmentClick(dept.id)}
            className={`p-1.5 text-sm font-medium rounded transition-all duration-200 ${
              activeDepartment === dept.id
                ? "bg-[#2BBAA5] text-white shadow-md"
                : "bg-[#93D3AE]/30 text-gray-700 hover:bg-[#93D3AE]/50"
            }`}
          >
            {dept.shortName}
          </button>
        ))}
      </div>
    </div>
  )
}
