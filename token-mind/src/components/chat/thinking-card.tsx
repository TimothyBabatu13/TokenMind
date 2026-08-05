import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useState } from "react"

interface ThinkingCardType {
    text: string,

}
export const ThinkingCard = ({ text } : ThinkingCardType) => {
    const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return ""
        return prev + "."
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="w-full max-w-sm shadow-lg overflow-hidden border-0">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">           
              <Image 
                src={"/logo.png"} 
                alt={`logo`} 
                fill 
                className="object-cover" 
            />
           
          </div>

          <div className="text-center space-y-2">
            {/* <h3 className="font-medium text-lg">TokenMind</h3> */}
            <div className="flex items-center justify-center">
              <div className="relative h-6">
                <p className="text-gray-600">
                  {text}
                  <span className="inline-block w-12 text-left">{dots}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="w-full mt-4">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-teal-500 animate-pulse"
                style={{ width: `${30 + dots.length * 20}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}