import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-main-gradient bg-grid bg-black text-white font-sans">
      {/* Header */}
      <header className="w-full flex flex-col items-center pt-10 pb-4">
        <Image
          src="/zyra-logo.png"
          alt="Zyra Logo"
          width={260}
          height={260}
          priority
          className="mb-1"
        />
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center gap-2 -mt-8">
        <p className="text-lg sm:text-xl font-medium max-w-xl mx-auto mb-6">
          Zyra is building the future of transparent crowdfunding in Africa.
          Join us early and help shape the journey.
        </p>
        <div className="flex flex-col md:flex-row gap-3 justify-between">
          <a
            href="https://t.me/zyraApp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-full bg-brand-blue text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Join Our Community 🚀
          </a>
          <a
            href="/pdf/zyra-litepaper-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-full border-2 bg-gradient-to-l from-blue-400 to-blue-400/80 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Zyra Litepaper
          </a>
        </div>
        <p className="text-xs text-neutral-400 mt-8 max-w-xs mx-auto">
          Blockchain-powered crowdfunding dApp on{" "}
          <span className="font-bold text-base-blue">Base</span> - bringing
          transparency, trust, and security to donations.
        </p>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 flex flex-col items-center gap-2 text-center text-sm text-neutral-400">
        <div className="flex gap-4 mb-2">
          <a
            href="https://x.com/ZyraApp"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-brand-blue"
          >
            Follow us on X-(Twitter)
          </a>
          <a
            href="https://t.me/zyraApp"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-brand-blue"
          >
            Community
          </a>
        </div>
        <div>© 2025 Zyra. All Rights Reserved.</div>
      </footer>
    </div>
  );
}
