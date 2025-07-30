import { Clock, ExternalLink, Tag, AlertCircle, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import type { DocumentationItem, LLMAnalysis } from '../types';

interface SearchResultsProps {
  results: DocumentationItem[];
  analysis?: LLMAnalysis;
  isAnalyzing?: boolean;
  totalCount: number;
  onDocumentClick: (document: DocumentationItem) => void;
}

export function SearchResults({ 
  results, 
  analysis, 
  isAnalyzing, 
  totalCount, 
  onDocumentClick 
}: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No documents found</div>
        <div className="text-gray-400 text-sm mt-2">
          Try adjusting your search terms or filters
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {results.length} of {totalCount} results
        </div>
        {isAnalyzing && (
          <div className="flex items-center space-x-2 text-primary-600">
            <div className="animate-spin h-4 w-4 border-2 border-primary-600 border-t-transparent rounded-full" />
            <span className="text-sm">Analyzing results...</span>
          </div>
        )}
      </div>

      {/* LLM Analysis */}
      {analysis && (
        <AnalysisPanel analysis={analysis} />
      )}

      {/* Search Results */}
      <div className="space-y-4">
        {results.map((document) => (
          <DocumentCard
            key={document.id}
            document={document}
            onClick={() => onDocumentClick(document)}
          />
        ))}
      </div>
    </div>
  );
}

interface AnalysisPanelProps {
  analysis: LLMAnalysis;
}

function AnalysisPanel({ analysis }: AnalysisPanelProps) {
  const confidenceColor = analysis.confidence >= 0.8 
    ? 'text-green-600' 
    : analysis.confidence >= 0.6 
    ? 'text-yellow-600' 
    : 'text-red-600';

  const confidenceIcon = analysis.confidence >= 0.8 
    ? CheckCircle 
    : analysis.confidence >= 0.6 
    ? AlertTriangle 
    : XCircle;

  const ConfidenceIcon = confidenceIcon;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <div className="bg-blue-100 p-2 rounded-lg mr-3">
            <AlertCircle className="h-6 w-6 text-blue-600" />
          </div>
          AI Analysis Summary
        </h3>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full bg-white ${confidenceColor}`}>
          <ConfidenceIcon className="h-4 w-4" />
          <span className="text-sm font-semibold">
            {Math.round(analysis.confidence * 100)}% confidence
          </span>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3 text-lg">Executive Summary</h4>
        <p className="text-gray-700 leading-relaxed text-base bg-white p-4 rounded-lg border border-blue-100">
          {analysis.summary}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Key Findings */}
        <div className="bg-white p-4 rounded-lg border border-blue-100">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            Key Findings
          </h4>
          <ul className="space-y-3">
            {analysis.keyFindings.map((finding, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700 text-sm leading-relaxed">{finding}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div className="bg-white p-4 rounded-lg border border-blue-100">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
            Recommendations
          </h4>
          <ul className="space-y-3">
            {analysis.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700 text-sm leading-relaxed">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Analysis generated on {new Date(analysis.analysisTimestamp).toLocaleString()}
      </div>
    </div>
  );
}

interface DocumentCardProps {
  document: DocumentationItem;
  onClick: () => void;
}

function DocumentCard({ document, onClick }: DocumentCardProps) {
  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div 
      className="border border-gray-200 rounded-xl p-6 hover:border-primary-300 hover:shadow-lg transition-all cursor-pointer bg-white group"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-700 line-clamp-2 flex-1 mr-4">
          {document.title}
        </h3>
        {document.relevanceScore && (
          <div className="flex-shrink-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-primary-100 text-primary-800 border border-primary-200">
              {Math.round(document.relevanceScore * 100)}% match
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
          {document.system}
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
          {document.category}
        </span>
        {document.metadata?.department && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
            {document.metadata.department}
          </span>
        )}
        {document.metadata?.severity && (
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(document.metadata.severity)}`}>
            {document.metadata.severity.toUpperCase()}
          </span>
        )}
      </div>

      <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
        {document.content.substring(0, 300)}
        {document.content.length > 300 && '...'}
      </p>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            {new Date(document.lastUpdated).toLocaleDateString()}
          </div>
          {document.metadata?.vehicleModel && (
            <div className="text-xs text-gray-500 font-medium">
              Model: {document.metadata.vehicleModel}
            </div>
          )}
          {document.metadata?.component && (
            <div className="text-xs text-gray-500 font-medium">
              Component: {document.metadata.component}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          {document.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="inline-flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
          {document.url && (
            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
          )}
        </div>
      </div>
    </div>
  );
}
