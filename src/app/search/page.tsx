import { SearchBar } from "@/components/search-bar"
import { FilterSidebar } from "@/components/filter-sidebar"
import { ToolGrid } from "@/components/tool-grid"

export default function SearchPage() {
  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64">
          <FilterSidebar />
        </aside>
        <main className="flex-1">
          <ToolGrid />
        </main>
      </div>
    </div>
  )
}

