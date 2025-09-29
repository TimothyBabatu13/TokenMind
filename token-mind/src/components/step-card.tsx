interface stepCardProp {
    number: string,
    title: string,
    description: string
}
export const StepCard =({ number, title, description } : stepCardProp) => {
    return (
      <div className=" rounded-xl p-8 border border-gray-700 relative">
        <div className="absolute -top-5 -left-5 h-12 w-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-xl">
          {number}
        </div>
        <h3 className="text-xl font-bold mb-3 mt-4">{title}</h3>
        <p className="text-black">{description}</p>
      </div>
    )
  }