import { SearchBar } from "@/components/search-bar"
import { FilterSidebar } from "@/components/filter-sidebar"
import { ToolGrid } from "@/components/tool-grid"

export default function ExplorePage() {
  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-8 text-center text-pink-500">Explore AI Tools</h1>
      <div className="mb-8">
        <SearchBar />
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64">
          <FilterSidebar />
        </aside>
        <main className="flex-1">
          <ToolGrid />
        </main>
      </div>
    </div>
  )
}

