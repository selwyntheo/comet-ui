import { useState, useCallback } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { useQuery as useTanStackQuery } from '@tanstack/react-query';
import { SEARCH_DOCUMENTATION, GET_SYSTEMS, GET_DEPARTMENTS } from '../graphql/queries';
import { llmService } from '../services/llm';
import type { 
  SearchQuery, 
  SearchSession, 
  CarManufacturingSystem, 
  Department 
} from '../types';

interface UseSearchProps {
  onSearchComplete?: (session: SearchSession) => void;
}

export function useSearch({ onSearchComplete }: UseSearchProps = {}) {
  const [currentSession, setCurrentSession] = useState<SearchSession | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchSession[]>([]);

  const [searchDocumentation, { loading: searchLoading, error: searchError }] = useLazyQuery(
    SEARCH_DOCUMENTATION,
    {
      onCompleted: (data) => {
        if (currentSession) {
          const updatedSession: SearchSession = {
            ...currentSession,
            results: data.searchDocumentation,
            status: 'analyzing',
          };
          setCurrentSession(updatedSession);
          
          // Start LLM analysis
          analyzeLLM(updatedSession);
        }
      },
    }
  );

  const analyzeLLM = useCallback(async (session: SearchSession) => {
    try {
      const analysis = await llmService.analyzeSearchResults(
        session.query.query,
        session.results.items
      );
      
      const completedSession: SearchSession = {
        ...session,
        analysis,
        status: 'complete',
      };
      
      setCurrentSession(completedSession);
      setSearchHistory(prev => [completedSession, ...prev.slice(0, 9)]); // Keep last 10 searches
      onSearchComplete?.(completedSession);
    } catch (error) {
      console.error('LLM analysis failed:', error);
      const errorSession: SearchSession = {
        ...session,
        status: 'error',
      };
      setCurrentSession(errorSession);
    }
  }, [onSearchComplete]);

  const executeSearch = useCallback(async (query: SearchQuery) => {
    const sessionId = `search_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const newSession: SearchSession = {
      id: sessionId,
      query,
      results: { items: [], totalCount: 0, facets: { categories: [], systems: [], departments: [] } },
      createdAt: new Date().toISOString(),
      status: 'searching',
    };
    
    setCurrentSession(newSession);
    
    // Execute GraphQL search
    await searchDocumentation({
      variables: {
        query: query.query,
        filters: query.filters,
        limit: query.limit || 20,
        offset: query.offset || 0,
      },
    });
  }, [searchDocumentation]);

  const clearSearch = useCallback(() => {
    setCurrentSession(null);
  }, []);

  return {
    currentSession,
    searchHistory,
    executeSearch,
    clearSearch,
    isSearching: searchLoading,
    searchError,
  };
}

export function useSearchSuggestions(query: string) {
  return useTanStackQuery({
    queryKey: ['searchSuggestions', query],
    queryFn: () => llmService.generateSearchSuggestions(query),
    enabled: query.length > 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSystems() {
  const { data, loading, error } = useQuery(GET_SYSTEMS);
  
  return {
    systems: (data?.systems || []) as CarManufacturingSystem[],
    loading,
    error,
  };
}

export function useDepartments() {
  const { data, loading, error } = useQuery(GET_DEPARTMENTS);
  
  return {
    departments: (data?.departments || []) as Department[],
    loading,
    error,
  };
}

export function useFilters() {
  const [activeFilters, setActiveFilters] = useState<SearchQuery['filters']>({});
  
  const updateFilter = useCallback((key: keyof NonNullable<SearchQuery['filters']>, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);
  
  const clearFilter = useCallback((key: keyof NonNullable<SearchQuery['filters']>) => {
    setActiveFilters(prev => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  }, []);
  
  const clearAllFilters = useCallback(() => {
    setActiveFilters({});
  }, []);
  
  const hasActiveFilters = Object.keys(activeFilters || {}).length > 0;
  
  return {
    activeFilters,
    updateFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
  };
}
