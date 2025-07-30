import { useState } from 'react';
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResults';
import { AlertCircle, Database, Wifi } from 'lucide-react';
import { mockSearchResult, mockLLMAnalysis } from '../data/mockData';
import type { SearchQuery, SearchSession } from '../types';

interface DemoModeProps {
  onBackToLive: () => void;
}

export function DemoMode({ onBackToLive }: DemoModeProps) {
  const [currentSession, setCurrentSession] = useState<SearchSession | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleDemoSearch = async (query: SearchQuery) => {
    setIsSearching(true);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const demoSession: SearchSession = {
      id: `demo_${Date.now()}`,
      query,
      results: {
        ...mockSearchResult,
        items: mockSearchResult.items.filter(item => 
          item.title.toLowerCase().includes(query.query.toLowerCase()) ||
          item.content.toLowerCase().includes(query.query.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(query.query.toLowerCase()))
        )
      },
      createdAt: new Date().toISOString(),
      status: 'analyzing'
    };
    
    setCurrentSession(demoSession);
    setIsSearching(false);
    
    // Simulate LLM analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setCurrentSession(prev => prev ? {
      ...prev,
      analysis: mockLLMAnalysis,
      status: 'complete'
    } : null);
  };

  const handleDocumentClick = (document: any) => {
    console.log('Demo: Document clicked:', document);
    // In demo mode, just log the click
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Banner */}
      <div className="bg-yellow-50 border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Database className="h-5 w-5 text-yellow-600" />
              <div>
                <span className="text-sm font-medium text-yellow-800">
                  Demo Mode Active
                </span>
                <span className="text-sm text-yellow-700 ml-2">
                  Using mock data for demonstration
                </span>
              </div>
            </div>
            <button
              onClick={onBackToLive}
              className="inline-flex items-center px-3 py-1 border border-yellow-300 rounded-md text-sm text-yellow-800 bg-yellow-100 hover:bg-yellow-200 transition-colors"
            >
              <Wifi className="h-4 w-4 mr-1" />
              Switch to Live Mode
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Database className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  CarDoc AI Agent - Demo
                </h1>
                <p className="text-sm text-gray-600">
                  Experience intelligent documentation search with sample data
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                Demo Mode Instructions
              </h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p>• Try searching for terms like "brake", "engine", "safety", or "paint"</p>
                <p>• The AI analysis will simulate real LLM-powered insights</p>
                <p>• All data shown is mock data for demonstration purposes</p>
                <p>• In live mode, this would connect to your GraphQL endpoint and LLM service</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Interface */}
        <div className="mb-8">
          <SearchBar
            onSearch={handleDemoSearch}
            isLoading={isSearching}
            placeholder="Try searching: brake safety, engine quality, paint procedures..."
          />
        </div>

        {/* Search Results */}
        {currentSession && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Demo Results for "{currentSession.query.query}"
              </h2>
              <button
                onClick={() => setCurrentSession(null)}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear search
              </button>
            </div>
            
            <SearchResults
              results={currentSession.results.items}
              analysis={currentSession.analysis}
              isAnalyzing={currentSession.status === 'analyzing'}
              totalCount={currentSession.results.totalCount}
              onDocumentClick={handleDocumentClick}
            />
          </div>
        )}

        {/* Welcome Message */}
        {!currentSession && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Database className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                CarDoc AI Agent Demo
              </h3>
              <p className="text-gray-600 mb-6">
                Experience the power of AI-driven documentation search with our 
                interactive demo using realistic manufacturing data.
              </p>
              <div className="text-sm text-gray-500">
                <div className="font-medium mb-2">Try these example searches:</div>
                <div className="space-y-1">
                  <div>• "brake safety inspection"</div>
                  <div>• "engine assembly quality"</div>
                  <div>• "paint booth ventilation"</div>
                  <div>• "welding standards"</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
