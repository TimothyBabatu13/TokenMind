import Link from "next/link"
import { ArrowRight, BarChart3, Search, TrendingUp, Repeat } from "lucide-react"
import { FeatureCard } from "@/components/feature-card"
import { StepCard } from "@/components/step-card"
import FooterYear from "@/components/footer-date"
import { GetStartedButton } from "@/components/client-buttons"
import Logo from "@/components/Logo"
// import { RedirectToChat } from "@/components/server-page"


export default function LandingPage() {

  return (
    <div className="min-h-screen text-black bg-[#80808012]">
      {/* <RedirectToChat /> */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        {/* <Link href={'/chat'}>Chat</Link> */}
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full flex items-center justify-center">
            <Logo />
            {/* <span className="font-bold text-xl">A</span> */}
          </div>
          <span className="font-bold text-xl">TokenMind</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link href="#features" className="hover:text-black transition">
            Features
          </Link>
          <Link href="#how-it-works" className="hover:text-black transition">
            How it works
          </Link>
          <Link href="#faq" className="hover:text-black transition">
            FAQ
          </Link>
        </div>
        <GetStartedButton text="Get Started" />
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 ">
          Your AI Crypto Assistant
        </h1>
        <p className="text-xl max-w-2xl mb-10">
          Discover trending tokens, get real-time news, and swap tokens seamlessly with our intelligent AI agent.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <GetStartedButton text="Get Started">
            <ArrowRight className="ml-2 h-5 w-5" />
          </GetStartedButton>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Powerful <span className="">Features</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<TrendingUp className="h-10 w-10 " />}
            title="Trending Tokens"
            description="Discover the hottest tokens in the market with real-time trending data."
          />
          <FeatureCard
            icon={<Search className="h-10 w-10 " />}
            title="Token Search"
            description="Find detailed information about any token with our powerful search."
          />
          <FeatureCard
            icon={<BarChart3 className="h-10 w-10 " />}
            title="X Trending News"
            description="Stay updated with the latest crypto news trending on X (Twitter)."
          />
          <FeatureCard
            icon={<Repeat className="h-10 w-10 " />}
            title="Token Swaps"
            description="Swap between tokens seamlessly with our integrated exchange."
          />
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          How It <span className="">Works</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard number="01" title="Sign Up" description="Create your account in seconds and connect your wallet." />
          <StepCard
            number="02"
            title="Chat with AI"
            description="Ask questions, get token info, or request market analysis."
          />
          <StepCard number="03" title="Trade & Track" description="Swap tokens and track your portfolio performance." />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className=" bg-black rounded-3xl p-10 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to revolutionize your crypto experience?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Join thousands of traders using our AI assistant to make smarter decisions.
          </p>
          <GetStartedButton text="Get Started Now">
            <ArrowRight className="ml-2 h-5 w-5" />
          </GetStartedButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-10 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
              <Logo />
              {/* <span className="font-bold text-sm">A</span> */}
            </div>
            <span className="font-bold text-xl">TokenMind</span>
          </div>
          <div className="flex gap-6 mb-6 md:mb-0">
            <Link href="#" className="text-gray-400 hover:text-white transition">
              Terms
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition">
              Privacy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition">
              Contact
            </Link>
          </div>
          <div className="text-gray-400 text-sm">© <FooterYear /> TokenMind. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}



