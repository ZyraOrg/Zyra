import './index.css'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen text-white bg-gray-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 bg-gray-800">
        <h1 className="text-2xl font-bold">Zyra</h1>
        <ul className="flex space-x-6">
          <li><a href="#" className="transition hover:text-blue-500">Home</a></li>
          <li><a href="#" className="transition hover:text-blue-500">Features</a></li>
          <li><a href="#" className="transition hover:text-blue-500">Pricing</a></li>
          <li><a href="#" className="transition hover:text-blue-500">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 px-6 text-center md:px-0">
        <h2 className="mb-4 text-5xl font-extrabold md:text-6xl">
          Transparent Blockchain Crowdfunding
        </h2>
        <p className="max-w-xl mb-8 text-lg md:text-xl">
          Raise verified funds securely and efficiently. Zyra makes crowdfunding trusted and transparent.
        </p>
        <button className="px-6 py-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-400 bg-gray-800">
        &copy; {new Date().getFullYear()} Zyra. All rights reserved.
      </footer>
    </div>
  )
}
