import { Input } from "./ui/input"
import { Button } from "./ui/button"

export function Newsletter() {
  return (
    <section className="my-24 bg-black bg-opacity-30 rounded-lg p-8 backdrop-filter backdrop-blur-lg">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4 text-purple-500 opacity-90">Stay Updated</h2>
        <p className="text-gray-400 mb-6">
          Subscribe to our newsletter for the latest AI tool updates and insights.
        </p>
        <form className="flex flex-col sm:flex-row gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-grow bg-black bg-opacity-30 border-purple-500 border-opacity-50 focus:border-opacity-75 backdrop-filter backdrop-blur-lg"
          />
          <Button type="submit" className="bg-gradient-to-r from-purple-500 to-purple-600 opacity-80 hover:opacity-100 text-white font-semibold">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}

