import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageIcon, Palette, Settings, Zap, Github } from "lucide-react";
import { Metadata } from "next";

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

// Define interface for GitHub stats
interface GitHubRepoStats {
  stars: number;
  forks: number;
  issues: number;
}

// Fetch GitHub stats server-side
async function fetchRepoStats(): Promise<GitHubRepoStats> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/udaypankhaniya/initials-image-generator",
      {
        next: { revalidate: 3600 },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch repo stats");
    }
    const data = await response.json();
    return {
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      issues: data.open_issues_count || 0,
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return { stars: 0, forks: 0, issues: 0 };
  }
}

// Server component
export default async function Home() {
  const repoStats = await fetchRepoStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 font-inter">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white鼅white/95 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <ImageIcon className="h-8 w-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Initials Image Generator
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/app">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-2 text-base font-medium transition-all duration-200">
                  Get Started
                </Button>
              </Link>
              <Link href="https://github.com/udaypankhaniya/initials-image-generator">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 rounded-full px-6 py-2 text-base font-medium transition-all duration-200"
                >
                  <Github className="h-5 w-5" />
                  <span>GitHub</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fade-in">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Create Stunning
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
              {" "}
              Initials Images
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Generate custom initials images with personalized colors and
            dimensions. Perfect for avatars, placeholders, and branding. Join
            our open-source community!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-3 text-lg font-medium transition-all duration-200"
              >
                Start Creating Images
              </Button>
            </Link>
            <Link href="https://github.com/udaypankhaniya/initials-image-generator">
              <Button
                variant="outline"
                size="lg"
                className="flex items-center space-x-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 rounded-full px-8 py-3 text-lg font-medium transition-all duration-200"
              >
                <Github className="h-5 w-5" />
                <span>Contribute on GitHub</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* GitHub Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-slide-up">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-medium">Stars</span>
              <span className="text-indigo-600 font-bold text-lg">
                {repoStats.stars}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-medium">Forks</span>
              <span className="text-indigo-600 font-bold text-lg">
                {repoStats.forks}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-medium">Issues</span>
              <span className="text-indigo-600 font-bold text-lg">
                {repoStats.issues}
              </span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 animate-slide-up">
            <div className="mx-auto w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Lightning Fast
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Generate high-quality initials images instantly with our optimized
              canvas rendering engine.
            </p>
          </div>

          <div className="text-center p-8 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 animate-slide-up">
            <div className="mx-auto w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Palette className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Fully Customizable
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Choose from unlimited color combinations and dimensions to match
              your brand or style.
            </p>
          </div>

          <div className="text-center p-8 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 animate-slide-up">
            <div className="mx-auto w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Settings className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Open Source
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Contribute to our GitHub repo, access the source code, and
              integrate our API for free.
            </p>
          </div>
        </div>

        {/* Open Source Section */}
        <div className="mt-24 bg-gray-900 rounded-xl p-10 text-white animate-slide-up">
          <h3 className="text-3xl font-bold mb-4">
            Open Source & Community Driven
          </h3>
          <p className="text-gray-200 mb-6 leading-relaxed text-lg">
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
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <p className="text-gray-200 mb-2">Example API Usage:</p>
            <code className="text-green-400 text-sm font-mono">
              GET
              /api/image?name=John+Doe&width=300&height=300&color=%23FF0000&bcolor=%230000FF
            </code>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
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
          <div className="mt-8">
            <Link href="https://github.com/udaypankhaniya/initials-image-generator/blob/main/CONTRIBUTING.md">
              <Button
                variant="secondary"
                className="bg-white text-indigo-600 hover:bg-gray-100 rounded-full px-8 py-3 text-base font-medium transition-all duration-200"
              >
                Read Contribution Guidelines
              </Button>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center animate-slide-up">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Join the Open Source Community
            </h3>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Create stunning initials images and contribute to our open-source
              project on GitHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/app">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-indigo-600 hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-medium transition-all duration-200"
                >
                  Create Your First Image
                </Button>
              </Link>
              <Link href="https://github.com/udaypankhaniya/initials-image-generator">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center space-x-2 border-white text-indigo-600 hover:bg-indigo-600/20 hover:text-white rounded-full px-8 py-3 text-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  <Github className="h-5 w-5" />
                  <span>Star on GitHub</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <ImageIcon className="h-6 w-6 text-indigo-600" />
              <span className="font-semibold text-gray-900 text-lg">
                Initials Image Generator
              </span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto">
              <a
                href="https://github.com/udaypankhaniya/initials-image-generator"
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repository
              </a>
              <a
                href="https://github.com/udaypankhaniya/initials-image-generator/blob/main/LICENSE"
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                License
              </a>
              <a
                href="https://github.com/udaypankhaniya/initials-image-generator/blob/main/CONTRIBUTING.md"
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
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
