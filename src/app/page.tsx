'use client'

import Link from 'next/link'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Hello World
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Welcome to my simple Next.js application
        </p>
        <Button variant="outlined" onClick={() => {
          router.push('/about')
        }}>About</Button>
      </div>
    </div>
  )
} 