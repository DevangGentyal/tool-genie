import { Button } from "./ui/button"

const categories = [
  "Image Generation",
  "Text to Speech",
  "Chatbots",
  "Code Assistance",
  "Data Analysis",
  "Video Editing",
]

export function PopularCategories() {
  return (
    <section className="my-24">
      <h2 className="text-4xl font-semibold mb-8 text-center text-white-500 opacity-90">Popular Categories</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            className="bg-black bg-opacity-30 border-purple-500 border-opacity-50 text-purple-400 hover:bg-purple-500 hover:bg-opacity-20 hover:text-white transition-colors backdrop-filter backdrop-blur-lg"
          >
            {category}
          </Button>
        ))}
      </div>
    </section>
  )
}

