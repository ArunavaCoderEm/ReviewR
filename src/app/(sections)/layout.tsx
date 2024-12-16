import { ChildrenType } from '@/Types/types'
import React from 'react'

export default function SectionLayout({children}: ChildrenType): React.ReactNode {
  return (
    <div className='py-4 px-5'>
      {children}
    </div>
  )
}
