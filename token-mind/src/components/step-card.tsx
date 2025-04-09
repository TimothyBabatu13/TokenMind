interface stepCardProp {
    number: string,
    title: string,
    description: string
}
export const StepCard =({ number, title, description } : stepCardProp) => {
    return (
      <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700 relative">
        <div className="absolute -top-5 -left-5 h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center font-bold text-xl">
          {number}
        </div>
        <h3 className="text-xl font-bold mb-3 mt-4">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    )
  }