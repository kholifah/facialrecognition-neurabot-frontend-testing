import Link from 'next/link'
import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Welcome to our Next.js application" />
      </Head>

      <main className="max-w-4xl mx-auto ">
        <h1 className="text-4xl font-bold mb-6">Welcome to Our Website</h1>
        
        <div className="bg-gray-500 p-6 rounded-lg shadow-md">
          <p className="text-lg mb-4">
            This is the home page of our Next.js application. We're using the Pages Router
            for navigation and routing.
          </p>
          
          <Link 
            href="/about"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Learn More About Us
          </Link>
        </div>
      </main>
    </div>
  )
}