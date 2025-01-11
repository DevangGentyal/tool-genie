import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-8 text-center text-pink-500">Contact Us</h1>
      <div className="max-w-2xl mx-auto">
        <p className="text-gray-400 mb-8 text-center">
          Have questions or suggestions? We'd love to hear from you. Fill out the form below, and we'll get back to you as soon as possible.
        </p>
        <ContactForm />
      </div>
    </div>
  )
}

