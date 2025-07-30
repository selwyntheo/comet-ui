import { gql } from '@apollo/client';

// Query to search documentation across all systems
export const SEARCH_DOCUMENTATION = gql`
  query SearchDocumentation(
    $query: String!
    $filters: SearchFiltersInput
    $limit: Int = 20
    $offset: Int = 0
  ) {
    searchDocumentation(
      query: $query
      filters: $filters
      limit: $limit
      offset: $offset
    ) {
      items {
        id
        title
        content
        category
        system
        lastUpdated
        relevanceScore
        url
        tags
        metadata {
          department
          vehicleModel
          component
          severity
        }
      }
      totalCount
      facets {
        categories {
          name
          count
        }
        systems {
          name
          count
        }
        departments {
          name
          count
        }
      }
    }
  }
`;

// Query to get all available systems for filtering
export const GET_SYSTEMS = gql`
  query GetSystems {
    systems {
      id
      name
      description
      category
      isActive
    }
  }
`;

// Query to get all departments
export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    departments {
      id
      name
      description
      contactInfo
    }
  }
`;

// Query to get a specific document by ID
export const GET_DOCUMENT = gql`
  query GetDocument($id: ID!) {
    document(id: $id) {
      id
      title
      content
      category
      system
      lastUpdated
      url
      tags
      metadata {
        department
        vehicleModel
        component
        severity
      }
    }
  }
`;

// Query to get search suggestions
export const GET_SEARCH_SUGGESTIONS = gql`
  query GetSearchSuggestions($input: String!) {
    searchSuggestions(input: $input) {
      suggestions
      popularQueries
    }
  }
`;

// Mutation to log search activity (for analytics)
export const LOG_SEARCH_ACTIVITY = gql`
  mutation LogSearchActivity(
    $query: String!
    $resultCount: Int!
    $clickedDocuments: [ID!]
  ) {
    logSearchActivity(
      query: $query
      resultCount: $resultCount
      clickedDocuments: $clickedDocuments
    ) {
      success
      sessionId
    }
  }
`;

// Fragment for reusable document fields
export const DOCUMENT_FRAGMENT = gql`
  fragment DocumentFields on DocumentationItem {
    id
    title
    content
    category
    system
    lastUpdated
    relevanceScore
    url
    tags
    metadata {
      department
      vehicleModel
      component
      severity
    }
  }
`;

// Input types for TypeScript
export interface SearchFiltersInput {
  category?: string[];
  system?: string[];
  department?: string[];
  vehicleModel?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface SearchDocumentationVariables {
  query: string;
  filters?: SearchFiltersInput;
  limit?: number;
  offset?: number;
}

export interface GetDocumentVariables {
  id: string;
}

export interface GetSearchSuggestionsVariables {
  input: string;
}

export interface LogSearchActivityVariables {
  query: string;
  resultCount: number;
  clickedDocuments?: string[];
}
