import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, X, Clock, Sparkles, ChevronDown } from 'lucide-react';
import { useSearchSuggestions, useFilters } from '../hooks/useSearch';
import type { SearchQuery } from '../types';

interface SearchBarProps {
  onSearch: (query: SearchQuery) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function SearchBar({ onSearch, isLoading, placeholder = 'Search documentation...' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { activeFilters, updateFilter, clearFilter, clearAllFilters, hasActiveFilters } = useFilters();
  
  const { data: suggestions = [], isLoading: suggestionsLoading } = useSearchSuggestions(query);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch({
        query: query.trim(),
        filters: activeFilters,
      });
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch({
      query: suggestion,
      filters: activeFilters,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(e.target.value.length > 2);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Search Container */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Search Form */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder={placeholder}
              className="block w-full pl-12 pr-32 py-4 border-0 text-lg placeholder-gray-500 focus:outline-none focus:ring-0 bg-transparent"
              disabled={isLoading}
              onFocus={() => setShowSuggestions(query.length > 2)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 space-x-2">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  hasActiveFilters 
                    ? 'text-primary-700 bg-primary-50 border border-primary-200' 
                    : 'text-gray-600 bg-gray-50 border border-gray-200 hover:bg-gray-100'
                }`}
                title="Filters"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary-600 text-white rounded-full">
                    {Object.keys(activeFilters || {}).length}
                  </span>
                )}
                <ChevronDown className={`h-3 w-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="btn-primary px-6 py-2 text-sm font-medium min-w-[80px] flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Active filters:</span>
              {Object.entries(activeFilters || {}).map(([key, value]) => {
                if (!value || (Array.isArray(value) && value.length === 0)) return null;
                
                const displayValue = Array.isArray(value) ? value.join(', ') : JSON.stringify(value);
                return (
                  <span
                    key={key}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white border border-gray-200 text-gray-700 shadow-sm"
                  >
                    <span className="font-medium text-gray-900">{key}:</span>
                    <span className="ml-1 max-w-[100px] truncate">{displayValue}</span>
                    <button
                      onClick={() => clearFilter(key as keyof typeof activeFilters)}
                      className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                );
              })}
              <button
                onClick={clearAllFilters}
                className="text-sm text-gray-500 hover:text-gray-700 underline font-medium"
              >
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto">
          {suggestionsLoading ? (
            <div className="p-6 text-center text-gray-500">
              <div className="flex items-center justify-center space-x-3">
                <Sparkles className="h-5 w-5 animate-pulse text-primary-500" />
                <span>Generating intelligent suggestions...</span>
              </div>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 border-b border-gray-100">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  AI-Powered Suggestions
                </span>
              </div>
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-primary-50 focus:outline-none transition-colors flex items-center space-x-3 group"
                    >
                      <Clock className="h-4 w-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
                      <span className="text-gray-900 group-hover:text-primary-700">{suggestion}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : query.length > 2 ? (
            <div className="p-6 text-center text-gray-500">
              <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <span>No suggestions available for "{query}"</span>
            </div>
          ) : null}
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && (
        <FilterPanel
          activeFilters={activeFilters}
          onFilterChange={updateFilter}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
}

interface FilterPanelProps {
  activeFilters: SearchQuery['filters'];
  onFilterChange: (key: keyof NonNullable<SearchQuery['filters']>, value: any) => void;
  onClose: () => void;
}

function FilterPanel({ activeFilters, onFilterChange, onClose }: FilterPanelProps) {
  const categories = ['Production', 'Quality', 'Safety', 'Design', 'Logistics', 'Maintenance'];
  const systems = ['Assembly Line', 'Paint Shop', 'Body Shop', 'Engine Plant', 'Transmission', 'Electronics'];
  const departments = ['Engineering', 'Manufacturing', 'Quality Control', 'Safety', 'Logistics', 'Maintenance'];

  return (
    <div className="absolute z-20 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Search Filters</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Categories */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-900 mb-3">Categories</label>
            <div className="space-y-3">
              {categories.map(category => (
                <label key={category} className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters?.category?.includes(category) || false}
                    onChange={(e) => {
                      const current = activeFilters?.category || [];
                      const updated = e.target.checked
                        ? [...current, category]
                        : current.filter(c => c !== category);
                      onFilterChange('category', updated);
                    }}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors"
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Systems */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-900 mb-3">Systems</label>
            <div className="space-y-3">
              {systems.map(system => (
                <label key={system} className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters?.system?.includes(system) || false}
                    onChange={(e) => {
                      const current = activeFilters?.system || [];
                      const updated = e.target.checked
                        ? [...current, system]
                        : current.filter(s => s !== system);
                      onFilterChange('system', updated);
                    }}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors"
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    {system}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Departments */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-900 mb-3">Departments</label>
            <div className="space-y-3">
              {departments.map(department => (
                <label key={department} className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters?.department?.includes(department) || false}
                    onChange={(e) => {
                      const current = activeFilters?.department || [];
                      const updated = e.target.checked
                        ? [...current, department]
                        : current.filter(d => d !== department);
                      onFilterChange('department', updated);
                    }}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors"
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    {department}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {Object.keys(activeFilters || {}).length} filter(s) applied
            </span>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  Object.keys(activeFilters || {}).forEach(key => {
                    onFilterChange(key as keyof typeof activeFilters, []);
                  });
                }}
                className="btn-secondary text-sm px-4 py-2"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="btn-primary text-sm px-4 py-2"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
