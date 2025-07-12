'use client';

import { useState, useEffect } from "react";
import { Star, GitFork, AlertCircle, Eye } from "lucide-react";

// Define interface for GitHub stats
interface GitHubRepoStats {
  stars: number;
  forks: number;
  issues: number;
  watches: number;
}

export default function GitHubStats() {
  const [repoStats, setRepoStats] = useState<GitHubRepoStats>({ stars: 0, forks: 0, issues: 0, watches: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRepoStats() {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://api.github.com/repos/udaypankhaniya/initials-image-generator",
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
            method: "GET",
            cache: "no-cache",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch repo stats");
        }
        const data = await response.json();
        setRepoStats({
          stars: data.stargazers_count || 0,
          forks: data.forks_count || 0,
          issues: data.open_issues_count || 0,
          watches: data.watchers_count || 0,
        });
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        setRepoStats({ stars: 0, forks: 0, issues: 0, watches: 0 });
      } finally {
        setIsLoading(false);
      }
    }
    fetchRepoStats();
  }, []);

  return (
    <div className="mt-12 text-center">
      <div className="inline-flex flex-wrap justify-center gap-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-2xl p-8 border border-indigo-100  ">
        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/50 backdrop-blur-sm hover:bg-indigo-100 hover:scale-105 transition-all duration-300 ease-in-out">
          <Star className="h-6 w-6 text-indigo-600" />
          <span className="text-gray-800 font-semibold">Stars</span>
          <span className="text-indigo-700 font-bold text-xl">
            {isLoading ? (
              <span className="animate-pulse opacity-50">...</span>
            ) : (
              <span className="animate-fade-in">{repoStats.stars.toLocaleString()}</span>
            )}
          </span>
        </div>
        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/50 backdrop-blur-sm hover:bg-indigo-100 hover:scale-105 transition-all duration-300 ease-in-out">
          <GitFork className="h-6 w-6 text-indigo-600" />
          <span className="text-gray-800 font-semibold">Forks</span>
          <span className="text-indigo-700 font-bold text-xl">
            {isLoading ? (
              <span className="animate-pulse opacity-50">...</span>
            ) : (
              <span className="animate-fade-in">{repoStats.forks.toLocaleString()}</span>
            )}
          </span>
        </div>
        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/50 backdrop-blur-sm hover:bg-indigo-100 hover:scale-105 transition-all duration-300 ease-in-out">
          <AlertCircle className="h-6 w-6 text-indigo-600" />
          <span className="text-gray-800 font-semibold">Issues</span>
          <span className="text-indigo-700 font-bold text-xl">
            {isLoading ? (
              <span className="animate-pulse opacity-50">...</span>
            ) : (
              <span className="animate-fade-in">{repoStats.issues.toLocaleString()}</span>
            )}
          </span>
        </div>
        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/50 backdrop-blur-sm hover:bg-indigo-100 hover:scale-105 transition-all duration-300 ease-in-out">
          <Eye className="h-6 w-6 text-indigo-600" />
          <span className="text-gray-800 font-semibold">Watches</span>
          <span className="text-indigo-700 font-bold text-xl">
            {isLoading ? (
              <span className="animate-pulse opacity-50">...</span>
            ) : (
              <span className="animate-fade-in">{repoStats.watches.toLocaleString()}</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}