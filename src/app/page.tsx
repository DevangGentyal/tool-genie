import { SearchBar } from "../components/search-bar"
import { PopularCategories } from "../components/popular-categories"
import { TrendingTools } from "../components/trending-tools"
import { FeaturedTools } from "../components/featured-tools"
import { Newsletter } from "../components/newsletter"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full px-50 pt-20 pb-12">
      <section className="text-center py-24 md:py-32">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="text-white  opacity-90">
            Discover the 
          </span>
          <span className="pl-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-500">
            Right Tools
          </span>
          <br />
          <span className="text-white opacity-90">
            for your needs.
          </span>
        </h1>
        <p className="pt-10 text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Explore a curated collection of cutting-edge AI solutions to supercharge your workflow
        </p>
        <SearchBar />
      </section>
      <PopularCategories />
      <TrendingTools />
      <FeaturedTools />
      <Newsletter />
    </div>
  )
}

