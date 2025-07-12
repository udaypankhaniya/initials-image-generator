import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageIcon, Palette, Settings, Zap, Github, Menu } from "lucide-react";
import { Metadata } from "next";
import dynamic from "next/dynamic";

// Dynamic import for GitHubStats
const GitHubStats = dynamic(() => import("@/components/GitHubStats"), {
  ssr: true,
});

const Header = dynamic(() => import("@/components/Header"), {
  ssr: true,
})
// Define metadata for SEO
export const metadata: Metadata = {
  title: "Initials Image Generator - Open Source Avatar Creator",
  description:
    "Create custom initials images with personalized colors and dimensions. An open-source project built with Next.js, TypeScript, and Canvas. Contribute on GitHub!",
  openGraph: {
    title: "Initials Image Generator",
    description:
      "Generate beautiful initials images for avatars, placeholders, and branding. Open source and community-driven.",
    url: "https://initials-image-generator-mauve.vercel.app",
    images: ["/og-image.png"],
  },
};

export default function Home() {


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 font-inter">
      {/* Header */}
    <Header />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Create Stunning
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
              {" "}
              Initials Images
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
            Generate custom initials images with personalized colors and
            dimensions. Perfect for avatars, placeholders, and branding. Join
            our open-source community!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/app">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Start Creating Images
              </Button>
            </Link>
            <Link href="https://github.com/udaypankhaniya/initials-image-generator">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto flex justify-center items-center space-x-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Contribute on GitHub</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* GitHub Stats */}
        <div className="mt-12 sm:mt-16">
          <GitHubStats />
        </div>

        {/* Features */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center p-6 sm:p-8 rounded-2xl bg-white shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 ease-in-out animate-slide-up">
            <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Lightning Fast
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Generate high-quality initials images instantly with our optimized
              canvas rendering engine.
            </p>
          </div>

          <div className="text-center p-6 sm:p-8 rounded-2xl bg-white shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 ease-in-out animate-slide-up">
            <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Palette className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Fully Customizable
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Choose from unlimited color combinations and dimensions to match
              your brand or style.
            </p>
          </div>

          <div className="text-center p-6 sm:p-8 rounded-2xl bg-white shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 ease-in-out animate-slide-up">
            <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Open Source
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Contribute to our GitHub repo, access the source code, and
              integrate our API for free.
            </p>
          </div>
        </div>

        {/* Open Source Section */}
        <div className="mt-16 sm:mt-20 bg-gray-900 rounded-2xl p-6 sm:p-8 lg:p-10 text-white animate-slide-up">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Open Source & Community Driven
          </h3>
          <p className="text-base sm:text-lg text-gray-200 mb-6 leading-relaxed">
            Initials Image Generator is an open-source project hosted on{" "}
            <a
              href="https://github.com/udaypankhaniya/initials-image-generator"
              className="text-indigo-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            . Join our community to contribute features, fix bugs, or suggest
            improvements. Your contributions shape the future of this tool!
          </p>
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-6">
            <p className="text-gray-200 mb-2 text-sm sm:text-base">Example API Usage:</p>
            <code className="text-green-400 text-xs sm:text-sm font-mono break-all">
              GET
              /api/image?name=John+Doe&width=300&height=300&color=%23FF0000&bcolor=%230000FF
            </code>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm">
            <span className="bg-indigo-600 px-3 py-1 rounded-full">
              TypeScript
            </span>
            <span className="bg-green-600 px-3 py-1 rounded-full">Next.js</span>
            <span className="bg-blue-600 px-3 py-1 rounded-full">
              Tailwind CSS
            </span>
            <span className="bg-yellow-600 px-3 py-1 rounded-full">
              Canvas API
            </span>
          </div>
          <div className="mt-6 sm:mt-8">
            <Link href="https://github.com/udaypankhaniya/initials-image-generator/blob/main/CONTRIBUTING.md">
              <Button
                variant="secondary"
                className="bg-white text-indigo-600 hover:bg-gray-100 rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Read Contribution Guidelines
              </Button>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 sm:mt-20 text-center animate-slide-up">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 sm:p-10 lg:p-12 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Join the Open Source Community
            </h3>
            <p className="text-base sm:text-lg text-gray-100 mb-6 sm:mb-8 leading-relaxed">
              Create stunning initials images and contribute to our open-source
              project on GitHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/app">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-gray-100 rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Create Your First Image
                </Button>
              </Link>
              <Link href="https://github.com/udaypankhaniya/initials-image-generator">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto flex justify-center items-center space-x-2 border-white text-indigo-600 hover:bg-indigo-600/20 hover:text-white rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Star on GitHub</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
              <span className="font-semibold text-gray-900 text-base sm:text-lg">
                Initials Image Generator
              </span>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
              An open-source project by{" "}
              <a
                href="https://github.com/udaypankhaniya"
                className="text-indigo-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Uday Pankhaniya
              </a>
              . Built with Next.js, TypeScript, and Canvas.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto">
              <a
                href="https://github.com/udaypankhaniya/initials-image-generator"
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm sm:text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repository
              </a>
              <a
                href="https://github.com/udaypankhaniya/initials-image-generator/blob/main/LICENSE"
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm sm:text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                License
              </a>
              <a
                href="https://github.com/udaypankhaniya/initials-image-generator/blob/main/CONTRIBUTING.md"
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm sm:text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contribute
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}