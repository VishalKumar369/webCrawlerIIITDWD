import React, { useState } from "react";
import { Search, X, Command, History, Sparkles } from "lucide-react";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample quick links
  const quickLinks = [
    { icon: Command, text: "All" },
    { icon: History, text: "Recent" },
    { icon: Sparkles, text: "Popular" },
  ];

  // Sample search results data
  const sampleResults = [
    {
      title: "What is React? - React Documentation",
      url: "https://react.dev/learn",
      description:
        "React is a JavaScript library for building user interfaces. Learn what React is all about on our homepage or in the tutorial.",
      tags: ["Framework", "JavaScript", "Frontend"],
    },
    {
      title: "Getting Started with Tailwind CSS",
      url: "https://tailwindcss.com/docs",
      description:
        "Tailwind CSS is a utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.",
      tags: ["CSS", "Styling", "Design"],
    },
    {
      title: "Vite | Next Generation Frontend Tooling",
      url: "https://vitejs.dev",
      description:
        "Vite is a modern frontend build tool that significantly improves the frontend development experience.",
      tags: ["Build Tool", "Development"],
    },
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSearchResults(
      sampleResults.filter(
        (result) =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    setIsLoading(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-6 animate-pulse">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-white p-6 rounded-2xl border border-gray-100"
        >
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-4 h-4 rounded-full bg-gray-200" />
            <div className="h-4 w-48 bg-gray-200 rounded" />
          </div>
          <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-full bg-gray-200 rounded mb-3" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((tag) => (
              <div key={tag} className="h-6 w-16 bg-gray-200 rounded-full" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  // Loading overlay component
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          {/* Animated circles */}
          <div className="absolute inset-0 rounded-full border-4 border-blue-500/30 animate-ping" />
          <div className="absolute inset-2 rounded-full border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          <div className="absolute inset-4 rounded-full border-4 border-purple-500/30 animate-pulse" />
        </div>
        <div className="text-gray-600 font-medium">Searching...</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {isLoading && <LoadingOverlay />}

      {/* Navbar */}
      <nav className="bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center ">
                <span className="text-white font-bold text-xl">
                  {" "}
                  <img src="/iiitdwd.svg" alt="" />
                </span>
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                IIIT Dharwad
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Search Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Find What You Need
          </h1>
          <p className="text-gray-600">
            Discover content across the IIIT Dharwad with our powerful search
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative mb-8">
          <div
            className={`relative transform transition-all duration-200 ${
              isInputFocused ? "scale-105" : ""
            }`}
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-200 shadow-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200"
              placeholder="Search anything..."
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </form>

        {/* Quick Links */}
        <div className="flex justify-center space-x-4 mb-8">
          {quickLinks.map((link, index) => (
            <button
              key={index}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-200 shadow-sm"
            >
              <link.icon className="h-4 w-4" />
              <span>{link.text}</span>
            </button>
          ))}
        </div>

        {/* Search Results or Loading State */}
        <div className="space-y-6">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            searchResults.map((result, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
                  <span>{result.url}</span>
                </div>
                <a href={result.url} className="text-xl font-medium text-gray-900 hover:text-blue-600 transition-colors mb-2">
                  {result.title}
                </a>
                <p className="text-gray-600 mb-3">{result.description}</p>
                <div className="flex flex-wrap gap-2">
                  {result.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* No Results State */}
        {!isLoading && searchQuery && searchResults.length === 0 && (
          <div className="text-center mt-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No results found for "{searchQuery}"
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or browse through our quick links
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
