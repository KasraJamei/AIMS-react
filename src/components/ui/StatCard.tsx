// src/components/ui/StatCard.tsx

import { type ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: string
  icon: ReactNode
  bgColor: string
  textColor: string
  size?: 'sm' | 'md'
}

const StatCard = ({
  title,
  value,
  icon,
  bgColor,
  textColor,
  size = 'md'
}: StatCardProps) => {
  const baseClasses = "bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
  const padding = size === 'sm' ? "p-3" : "p-6"
  const textSizeValue = size === 'sm' ? "text-lg" : "text-2xl"
  const textSizeTitle = size === 'sm' ? "text-xs" : "text-sm"
  const iconSize = size === 'sm' ? "p-2" : "p-3"

  return (
    <div className={`${baseClasses} ${padding}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`${textSizeTitle} font-medium text-gray-600 mb-1`}>
            {title}
          </p>
          <p className={`font-bold text-gray-900 ${textSizeValue}`}>
            {value}
          </p>
        </div>
        <div className={`${iconSize} rounded-lg ${bgColor}`}>
          <div className={`text-lg ${textColor}`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatCard
