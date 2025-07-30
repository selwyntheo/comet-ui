// Types for the car manufacturing documentation search agent

export interface DocumentationItem {
  id: string;
  title: string;
  content: string;
  category: string;
  system: string;
  lastUpdated: string;
  relevanceScore?: number;
  url?: string;
  tags: string[];
  metadata?: {
    department?: string;
    vehicleModel?: string;
    component?: string;
    severity?: 'low' | 'medium' | 'high' | 'critical';
  };
  // Enhanced fields for manufacturing system integration
  fullyQualifiedName?: string;
  enumValues?: string[];
  defaultJsonFile?: string;
  publisher?: string;
  subscriber?: string;
  bundleName?: string;
  packageName?: string;
  fullCommand?: string;
}

export interface SearchQuery {
  query: string;
  filters?: {
    category?: string[];
    system?: string[];
    department?: string[];
    vehicleModel?: string[];
    dateRange?: {
      start: string;
      end: string;
    };
  };
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  items: DocumentationItem[];
  totalCount: number;
  facets: {
    categories: Array<{ name: string; count: number }>;
    systems: Array<{ name: string; count: number }>;
    departments: Array<{ name: string; count: number }>;
  };
}

export interface LLMAnalysis {
  summary: string;
  keyFindings: string[];
  recommendations: string[];
  relevantDocuments: string[];
  confidence: number;
  analysisTimestamp: string;
}

export interface SearchSession {
  id: string;
  query: SearchQuery;
  results: SearchResult;
  analysis?: LLMAnalysis;
  createdAt: string;
  status: 'searching' | 'analyzing' | 'complete' | 'error';
}

export interface GraphQLError {
  message: string;
  locations?: Array<{
    line: number;
    column: number;
  }>;
  path?: string[];
  extensions?: Record<string, any>;
}

export interface CarManufacturingSystem {
  id: string;
  name: string;
  description: string;
  category: 'production' | 'quality' | 'safety' | 'design' | 'logistics' | 'maintenance';
  isActive: boolean;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  contactInfo?: string;
}
