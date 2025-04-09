
interface FeatureCardProp {
    icon: React.ReactNode,
    title: string,
    description: string
}
export const FeatureCard = ({ icon, title, description } : FeatureCardProp
) => {
    return (
      <div className="bg-gray-800/50 cursor-pointer rounded-xl p-6 hover:bg-gray-800/80 transition border border-gray-700 hover:border-purple-500/50">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    )
  }