import { ChildrenType } from '@/Types/types'
import React from 'react'

export default function SectionLayout({children}: ChildrenType): React.ReactNode {
  return (
    <div>
        {children}
    </div>
  )
}
