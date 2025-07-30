import { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { apolloClient } from './lib/apollo';
import { useSearch } from './hooks/useSearch';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { DemoMode } from './components/DemoMode';
import { FileText, Search, TrendingUp, Users, AlertTriangle, Database } from 'lucide-react';
import type { DocumentationItem, SearchSession } from './types';

// Create a client for TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const [, setSelectedDocument] = useState<DocumentationItem | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const { 
    currentSession, 
    searchHistory, 
    executeSearch, 
    clearSearch, 
    isSearching,
    searchError
  } = useSearch({
    onSearchComplete: (session: SearchSession) => {
      console.log('Search completed:', session);
    }
  });

  const handleDocumentClick = (document: DocumentationItem) => {
    setSelectedDocument(document);
    // In a real app, this might open a modal or navigate to a detail page
    console.log('Document clicked:', document);
  };

  // Check if GraphQL endpoint is available
  const hasGraphQLEndpoint = !!import.meta.env.VITE_GRAPHQL_ENDPOINT;
  const hasLLMKey = !!import.meta.env.VITE_LLAMA_API_KEY || !!import.meta.env.VITE_LLAMA_API_URL;

  // Show demo mode if no GraphQL endpoint or if explicitly requested
  if (isDemoMode || !hasGraphQLEndpoint) {
    return <DemoMode onBackToLive={() => setIsDemoMode(false)} />;
  }

  const stats = [
    { name: 'Total Documents', value: '12,450', icon: FileText, color: 'text-blue-600' },
    { name: 'Active Systems', value: '23', icon: TrendingUp, color: 'text-green-600' },
    { name: 'Recent Searches', value: searchHistory.length.toString(), icon: Search, color: 'text-purple-600' },
    { name: 'Departments', value: '8', icon: Users, color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Configuration Warning */}
      {(!hasGraphQLEndpoint || !hasLLMKey) && (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div className="text-sm">
                  <span className="font-medium text-yellow-800">Configuration Required: </span>
                  <span className="text-yellow-700">
                    {!hasGraphQLEndpoint && 'GraphQL endpoint not configured. '}
                    {!hasLLMKey && 'Llama API endpoint not configured. '}
                    Set up your .env file for full functionality.
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsDemoMode(true)}
                className="inline-flex items-center px-3 py-1 border border-yellow-300 rounded-md text-sm text-yellow-800 bg-yellow-100 hover:bg-yellow-200 transition-colors"
              >
                <Database className="h-4 w-4 mr-1" />
                Try Demo Mode
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Search className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  CarDoc AI Agent
                </h1>
                <p className="text-sm text-gray-600 mt-1 font-medium">
                  Intelligent Documentation Search for Manufacturing Excellence
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsDemoMode(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 hover:from-blue-100 hover:to-blue-200 transition-all rounded-lg border border-blue-200 font-medium shadow-sm hover:shadow-md"
              >
                <Database className="h-4 w-4" />
                <span>View Demo</span>
              </button>
              <div className="text-sm">
                {currentSession ? (
                  <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                    <div className={`w-3 h-3 rounded-full shadow-sm ${
                      currentSession.status === 'complete' ? 'bg-green-500 animate-pulse' : 
                      currentSession.status === 'error' ? 'bg-red-500' : 
                      'bg-yellow-500 animate-pulse'
                    }`} />
                    <span className="text-gray-800 font-semibold">
                      {currentSession.status === 'complete' ? 'Analysis Complete' :
                       currentSession.status === 'error' ? 'Error Occurred' :
                       currentSession.status === 'analyzing' ? 'Analyzing Results...' : 'Searching Documentation...'}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-600 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 font-medium">
                    Ready to Search
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {searchError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Search Error</h3>
                <p className="text-sm text-red-700 mt-1">
                  {searchError.message || 'An error occurred while searching. Please try again.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 hover:border-primary-200 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2 group-hover:text-gray-700 transition-colors">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-primary-50 group-hover:to-primary-100 transition-all duration-200 shadow-sm`}>
                  <stat.icon className={`h-6 w-6 ${stat.color} group-hover:scale-110 transition-transform`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search Interface */}
        <div className="mb-8">
          <SearchBar
            onSearch={executeSearch}
            isLoading={isSearching}
            placeholder="Search manufacturing documentation, procedures, safety protocols..."
          />
        </div>

        {/* Search Results */}
        {currentSession && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Search Results for "{currentSession.query.query}"
                </h2>
                <button
                  onClick={clearSearch}
                  className="text-sm text-gray-500 hover:text-gray-700 underline font-medium"
                >
                  Clear search
                </button>
              </div>
            </div>
            <div className="p-6">
              <SearchResults
                results={currentSession.results.items}
                analysis={currentSession.analysis}
                isAnalyzing={currentSession.status === 'analyzing'}
                totalCount={currentSession.results.totalCount}
                onDocumentClick={handleDocumentClick}
              />
            </div>
          </div>
        )}

        {/* Recent Searches */}
        {!currentSession && searchHistory.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Searches</h2>
            <div className="space-y-3">
              {searchHistory.slice(0, 5).map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => executeSearch(session.query)}
                >
                  <div>
                    <div className="font-medium text-gray-900 mb-1">{session.query.query}</div>
                    <div className="text-sm text-gray-500">
                      {session.results.totalCount} results • {new Date(session.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    session.status === 'complete' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Welcome Message */}
        {!currentSession && searchHistory.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-primary-100 to-primary-50 p-8 rounded-2xl mb-8">
                <Search className="h-20 w-20 text-primary-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Welcome to CarDoc AI Agent
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  Search through thousands of manufacturing documents, safety protocols, 
                  quality standards, and technical procedures. Our AI agent will analyze 
                  results and provide detailed insights tailored for automotive manufacturing.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200 text-left">
                  <h4 className="font-semibold text-gray-900 mb-3">Quick Search Examples</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span>"Paint booth safety procedures"</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span>"Engine assembly quality checks"</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span>"Brake system troubleshooting"</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span>"Welding standards and protocols"</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-gray-200 text-left">
                  <h4 className="font-semibold text-gray-900 mb-3">AI-Powered Features</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Intelligent search suggestions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Automated content analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Key findings extraction</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Actionable recommendations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default App;
