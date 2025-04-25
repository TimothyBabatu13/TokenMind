"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MessageCircle } from "lucide-react"

interface LoadingScreenProps {
  onLoadComplete?: () => void
  loadingTime?: number // in milliseconds
}

export default function LoadingScreen({
  onLoadComplete,
  loadingTime = 3000,
}: LoadingScreenProps) {
  const router = useRouter()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const endTime = startTime + loadingTime

    const updateProgress = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - startTime
      const newProgress = Math.min((elapsed / loadingTime) * 100, 100)

      setProgress(newProgress)

      if (currentTime < endTime) {
        requestAnimationFrame(updateProgress)
      } else {
        // Loading complete
        if (onLoadComplete) {
          onLoadComplete()
        }
      }
    }

    requestAnimationFrame(updateProgress)

    return () => {
      // Cleanup if component unmounts
    }
  }, [loadingTime, onLoadComplete, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md px-8 py-12 space-y-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-white dark:bg-gray-800 shadow-lg">
            <MessageCircle className="w-12 h-12 text-violet-500 dark:text-violet-400" />
            <div
              className="absolute inset-0 rounded-full border-4 border-violet-500 dark:border-violet-400"
              style={{
                clipPath: `polygon(0% 0%, ${progress}% 0%, ${progress}% 100%, 0% 100%)`,
                transition: "clip-path 0.1s ease-out",
              }}
            />
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Chat App</h1>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-violet-500 dark:bg-violet-400 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-center animate-pulse">Loading your conversations...</p>
        </div>
      </div>

      <div className="fixed bottom-4 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Chat App
      </div>
    </div>
  )
}
