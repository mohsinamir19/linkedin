import { useState } from "react";
import { Sparkles, ChartLine, Users, Settings } from "lucide-react";
import { PostAgent } from "./components/PostAgent";
import { AnalyzerAgent } from "./components/AnalyzerAgent";
import { LeadsAgent } from "./components/LeadsAgent";

type Page = "posts" | "analytics" | "leads";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("posts");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">LinkedIn AI Agent</h1>
                <p className="text-xs text-gray-500 hidden sm:block">AI-Powered LinkedIn Assistant</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setCurrentPage("posts")}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition-colors ${
                  currentPage === "posts"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm sm:text-base">Posts</span>
              </button>
              <button
                onClick={() => setCurrentPage("analytics")}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition-colors ${
                  currentPage === "analytics"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ChartLine className="w-4 h-4" />
                <span className="text-sm sm:text-base">Analytics</span>
              </button>
              <button
                onClick={() => setCurrentPage("leads")}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition-colors ${
                  currentPage === "leads"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Users className="w-4 h-4" />
                <span className="text-sm sm:text-base">Leads</span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors sm:ml-2">
                <Settings className="w-5 h-5" />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {currentPage === "posts" && <PostAgent />}
        {currentPage === "analytics" && <AnalyzerAgent />}
        {currentPage === "leads" && <LeadsAgent />}
      </main>
    </div>
  );
}