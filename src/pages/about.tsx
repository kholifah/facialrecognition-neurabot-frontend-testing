
import Head from 'next/head'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

export default function About() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Head>
        <title>About</title>
        <meta name="description" content="About page" />
      </Head>

      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          About
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          This is a simple Next.js application built with TypeScript and Tailwind CSS. 
          It demonstrates basic routing and page structure.
        </p>
        <Button variant="outlined" onClick={() => {
          router.push('/')
        }}>Outlined</Button>

      </div>
    </div>
  )
} 