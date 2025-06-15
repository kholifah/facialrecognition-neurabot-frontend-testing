import Link from 'next/link'
import Head from 'next/head'

export default function About() {
  return (
    <div className="min-h-screen p-8">
      <Head>
        <title>About Us</title>
        <meta name="description" content="Learn more about our company" />
      </Head>

      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        
        <div className="bg-gray-500 p-6 rounded-lg shadow-md">
          <p className="text-lg mb-4">
            Welcome to our About page! This is a dummy page created to demonstrate
            Next.js Pages Router functionality. Here you can learn more about our
            company and what we do.
          </p>
          
          <div className="mt-6">
            <Link 
              href="/"
              className="inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
} 