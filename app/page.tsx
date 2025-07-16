import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageIcon, Palette, Settings, Zap, Github } from "lucide-react";
import { Metadata } from "next";
import dynamic from "next/dynamic";

// Dynamic imports
const GitHubStats = dynamic(() => import("@/components/GitHubStats"), { ssr: true });
const Header = dynamic(() => import("@/components/Header"), { ssr: true });

// Smooth scrolling polyfill


// Metadata with favicon
export const metadata: Metadata = {
  title: "Initials Image Generator - Custom Avatars & Profiles",
  description:
    "Create professional avatars and initials images with custom colors and sizes using our open-source tool built with Next.js, TypeScript, and Canvas. ",
  openGraph: {
    title: "Initials Image Generator - Custom Avatars",
    description:
      "Generate customizable avatars for profiles, branding, or placeholders. Open-source and community-driven.",
    url: "https://initials-image-generator-mauve.vercel.app",
    images: ["/favicon.ico"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 font-inter text-gray-900">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main
        id="hero"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 animate-fade-in"
      >
        <div className="text-center">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-gray-900">
            Create Professional
            <span className="block text-indigo-600">Avatars & Initials</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
            Design customizable avatars and initials images with tailored colors, sizes, and styles, perfect for digital profiles, branding, or placeholders.
          </p>
          <p className="text-base sm:text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Our high-performance canvas rendering engine generates avatars instantly, optimized for modern web applications and seamless user experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-indigo"
              >
                Create Your Avatar
              </Button>
            </Link>
            <Link href="https://github.com/udaypankhaniya/initials-image-generator">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto flex items-center space-x-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 rounded-full px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-indigo"
              >
                <Github className="h-5 w-5" />
                <span>Contribute on GitHub</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Use Cases Section */}
        <div
          id="use-cases"
          className="mt-20 animate-slide-up"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Why Use Our Avatar Generator?
          </h3>
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed text-center">
            From enhancing user profiles on social platforms to creating consistent branding for businesses, our tool delivers versatile, high-quality avatars for diverse professional applications.
          </p>
        </div>

        {/* GitHub Stats */}
        <div
          id="stats"
          className="mt-16 animate-fade-in"
        >
          <GitHubStats />
        </div>

        {/* Features */}
        <div
          id="features"
          className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <Zap className="h-6 w-6 text-indigo-600" />,
              title: "High Performance",
              desc: "Generate high-quality avatars instantly with our optimized canvas rendering engine, ensuring seamless performance across modern web and mobile applications.",
            },
            {
              icon: <Palette className="h-6 w-6 text-indigo-600" />,
              title: "Fully Customizable",
              desc: "Tailor avatars with diverse color palettes, custom dimensions, and font styles to align perfectly with your brand or personal aesthetic preferences.",
            },
            {
              icon: <Settings className="h-6 w-6 text-indigo-600" />,
              title: "Open Source Core",
              desc: "Contribute to our GitHub repository, integrate our free API, or customize the tool to meet your project’s specific requirements.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className={`text-center p-8 rounded-2xl bg-white/95 backdrop-blur-sm border border-indigo-100 hover:shadow-indigo transition-all duration-300 animate-slide-up delay-${i * 200}`}
            >
              <div className="mx-auto w-14 h-14 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-base text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Open Source Section */}
        <div
          id="open-source"
          className="mt-20 bg-white/95 backdrop-blur-sm rounded-2xl p-8 lg:p-12 animate-fade-in"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Open Source Innovation</h3>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Initials Image Generator is an open-source project hosted on{" "}
            <a
              href="https://github.com/udaypankhaniya/initials-image-generator"
              className="text-indigo-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            . Join our global community to enhance avatar creation using Next.js, TypeScript, and Canvas API technologies.
          </p>
          <p className="text-base text-gray-600 mb-6 leading-relaxed">
            Contribute innovative features, report issues, or propose enhancements to shape the future of this tool for developers, designers, and businesses worldwide.
          </p>
          <div className="bg-indigo-50 rounded-lg p-6 mb-6">
            <p className="text-gray-600 mb-2 text-base">Example API Usage:</p>
            <code className="text-indigo-700 text-sm font-mono break-all">
              GET /api/image?name=John+Doe&width=300&height=300&color=%23FF0000&bcolor=%230000FF
            </code>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full">TypeScript</span>
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full">Next.js</span>
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full">Tailwind CSS</span>
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full">Canvas API</span>
          </div>
          <div className="mt-8">
            <Link href="https://github.com/udaypankhaniya/initials-image-generator/blob/main/CONTRIBUTING.md">
              <Button
                variant="secondary"
                className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-full px-8 py-3 text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-indigo"
              >
                Read Contribution Guidelines
              </Button>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div
          id="cta"
          className="mt-20 text-center animate-slide-up"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-10 lg:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Join the Avatar Creation Community</h3>
            <p className="text-lg mb-8 leading-relaxed">
              Build professional avatars and contribute to our open-source ecosystem, driving innovation in digital identity solutions for modern applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/app">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-indigo"
                >
                  Create Your First Avatar
                </Button>
              </Link>
              <Link href="https://github.com/udaypankhaniya/initials-image-generator">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto flex items-center space-x-2 border-white text-indigo-600 hover:bg-indigo-700/30 rounded-full px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-indigo hover:text-white"
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
      <footer className="border-t border-indigo-100 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <ImageIcon className="h-6 w-6 text-indigo-600" />
              <span className="font-semibold text-gray-900 text-lg">Initials Image Generator</span>
            </div>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              An open-source project by{" "}
              <a
                href="https://github.com/udaypankhaniya"
                className="text-indigo-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Uday Pankhaniya
              </a>
              . Powered by Next.js, TypeScript, and Canvas for professional avatar creation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto">
              <a
                href="https://github.com/udaypankhaniya/initials-image-generator"
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repository
              </a>
              <a
                href="https://github.com/udaypankhaniya/initials-image-generator/blob/main/LICENSE"
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                License
              </a>
              <a
                href="https://github.com/udaypankhaniya/initials-image-generator/blob/main/CONTRIBUTING.md"
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-base"
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