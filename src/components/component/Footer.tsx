import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className='flex p-4 items-center justify-center'>
        Made By <Link href={"https://meard.vercel.app/"} target='_blank' className='mx-2 text-teal-500'>Godard</Link> with 💚
    </footer>
  )
}
