
interface FeatureCardProp {
    icon: React.ReactNode,
    title: string,
    description: string
}
export const FeatureCard = ({ icon, title, description } : FeatureCardProp
) => {
    return (
      <div className=" cursor-pointer rounded-xl p-6  transition border border-gray-700 ">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    )
  }