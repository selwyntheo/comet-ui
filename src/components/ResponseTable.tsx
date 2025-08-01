import React, { useState } from 'react';
import { 
  Table, 
  Database, 
  Package, 
  Users, 
  Terminal, 
  Copy, 
  ExternalLink, 
  ChevronDown, 
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';
import type { DocumentationItem } from '../types';

interface ResponseTableProps {
  results: DocumentationItem[];
  onRowClick?: (item: DocumentationItem) => void;
}

interface TableColumn {
  key: keyof DocumentationItem | 'actions';
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  sortable?: boolean;
  render?: (item: DocumentationItem) => React.ReactNode;
}

export function ResponseTable({ results, onRowClick }: ResponseTableProps) {
  const [sortColumn, setSortColumn] = useState<string>('relevanceScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(['fullyQualifiedName', 'enumValues', 'defaultJsonFile', 'publisher', 'subscriber', 'bundleName', 'packageName'])
  );

  const columns: TableColumn[] = [
    {
      key: 'fullyQualifiedName',
      label: 'Fully Qualified Name',
      icon: Database,
      sortable: true,
      render: (item) => (
        <div className="font-mono text-sm bg-gray-50 px-2 py-1 rounded border">
          {item.fullyQualifiedName || 'N/A'}
        </div>
      )
    },
    {
      key: 'enumValues',
      label: 'Enum Values',
      icon: Package,
      sortable: false,
      render: (item) => (
        <div className="max-w-xs">
          {item.enumValues && item.enumValues.length > 0 ? (
            <div className="space-y-1">
              {item.enumValues.slice(0, 3).map((value, index) => (
                <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                  {value}
                </span>
              ))}
              {item.enumValues.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{item.enumValues.length - 3} more
                </span>
              )}
            </div>
          ) : (
            <span className="text-gray-400 text-sm">No enum values</span>
          )}
        </div>
      )
    },
    {
      key: 'defaultJsonFile',
      label: 'Default JSON File',
      icon: Database,
      sortable: true,
      render: (item) => (
        <div className="font-mono text-sm">
          {item.defaultJsonFile ? (
            <div className="flex items-center space-x-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                {item.defaultJsonFile}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(item.defaultJsonFile!);
                }}
                className="text-gray-400 hover:text-gray-600"
                title="Copy filename"
              >
                <Copy className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <span className="text-gray-400">No default file</span>
          )}
        </div>
      )
    },
    {
      key: 'publisher',
      label: 'Publisher',
      icon: Users,
      sortable: true,
      render: (item) => (
        <div className="flex items-center space-x-2">
          {item.publisher ? (
            <>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium text-gray-900">{item.publisher}</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span className="text-gray-400">No publisher</span>
            </>
          )}
        </div>
      )
    },
    {
      key: 'subscriber',
      label: 'Subscriber',
      icon: Users,
      sortable: true,
      render: (item) => (
        <div className="flex items-center space-x-2">
          {item.subscriber ? (
            <>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="font-medium text-gray-900">{item.subscriber}</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span className="text-gray-400">No subscriber</span>
            </>
          )}
        </div>
      )
    },
    {
      key: 'bundleName',
      label: 'Bundle Name',
      icon: Package,
      sortable: true,
      render: (item) => (
        <div className="font-mono text-sm">
          {item.bundleName ? (
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
              {item.bundleName}
            </span>
          ) : (
            <span className="text-gray-400">No bundle</span>
          )}
        </div>
      )
    },
    {
      key: 'packageName',
      label: 'Package Name',
      icon: Package,
      sortable: true,
      render: (item) => (
        <div className="font-mono text-sm">
          {item.packageName ? (
            <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">
              {item.packageName}
            </span>
          ) : (
            <span className="text-gray-400">No package</span>
          )}
        </div>
      )
    },
    {
      key: 'fullCommand',
      label: 'Full Command',
      icon: Terminal,
      sortable: false,
      render: (item) => (
        <div className="max-w-md">
          {item.fullCommand ? (
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs overflow-x-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Command:</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(item.fullCommand!);
                  }}
                  className="text-gray-400 hover:text-green-400"
                  title="Copy command"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </div>
              <code className="whitespace-pre-wrap break-all">
                {item.fullCommand}
              </code>
            </div>
          ) : (
            <span className="text-gray-400">No command available</span>
          )}
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (item) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleExpandRow(item.id);
            }}
            className="text-gray-400 hover:text-gray-600"
            title={expandedRows.has(item.id) ? "Collapse details" : "Expand details"}
          >
            {expandedRows.has(item.id) ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          {item.url && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(item.url, '_blank');
              }}
              className="text-gray-400 hover:text-blue-600"
              title="Open external link"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          )}
        </div>
      )
    }
  ];

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const toggleExpandRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const toggleColumnVisibility = (columnKey: string) => {
    const newVisible = new Set(visibleColumns);
    if (newVisible.has(columnKey)) {
      newVisible.delete(columnKey);
    } else {
      newVisible.add(columnKey);
    }
    setVisibleColumns(newVisible);
  };

  const sortedResults = [...results].sort((a, b) => {
    const aValue = a[sortColumn as keyof DocumentationItem];
    const bValue = b[sortColumn as keyof DocumentationItem];
    
    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return 1;
    if (bValue === undefined) return -1;
    
    const comparison = String(aValue).localeCompare(String(bValue));
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const visibleColumnsArray = columns.filter(col => 
    col.key === 'actions' || visibleColumns.has(col.key as string)
  );

  if (!results.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <Table className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Results Available</h3>
        <p className="text-gray-500">
          No search results to display in table format. Try performing a search first.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Header with column controls */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Table className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Response Details Table
            </h3>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm font-medium">
              {results.length} results
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Show columns:</span>
            {columns.slice(0, -1).map((column) => (
              <button
                key={column.key as string}
                onClick={() => toggleColumnVisibility(column.key as string)}
                className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors ${
                  visibleColumns.has(column.key as string)
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {visibleColumns.has(column.key as string) ? (
                  <Eye className="h-3 w-3" />
                ) : (
                  <EyeOff className="h-3 w-3" />
                )}
                <span>{column.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {visibleColumnsArray.map((column) => (
                <th
                  key={column.key as string}
                  className={`px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  onClick={() => column.sortable && handleSort(column.key as string)}
                >
                  <div className="flex items-center space-x-2">
                    {column.icon && <column.icon className="h-4 w-4" />}
                    <span>{column.label}</span>
                    {column.sortable && sortColumn === column.key && (
                      <ChevronDown className={`h-3 w-3 transition-transform ${
                        sortDirection === 'asc' ? 'rotate-180' : ''
                      }`} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedResults.map((item) => (
              <React.Fragment key={item.id}>
                <tr
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onRowClick?.(item)}
                >
                  {visibleColumnsArray.map((column) => (
                    <td key={column.key as string} className="px-4 py-4 whitespace-nowrap">
                      {column.render ? column.render(item) : (
                        <span className="text-sm text-gray-900">
                          {String(item[column.key as keyof DocumentationItem] || 'N/A')}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
                
                {/* Expanded row details */}
                {expandedRows.has(item.id) && (
                  <tr className="bg-gray-50">
                    <td colSpan={visibleColumnsArray.length} className="px-4 py-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Document Details</h4>
                          <dl className="space-y-2 text-sm">
                            <div>
                              <dt className="font-medium text-gray-600">Title:</dt>
                              <dd className="text-gray-900">{item.title}</dd>
                            </div>
                            <div>
                              <dt className="font-medium text-gray-600">Category:</dt>
                              <dd className="text-gray-900">{item.category}</dd>
                            </div>
                            <div>
                              <dt className="font-medium text-gray-600">System:</dt>
                              <dd className="text-gray-900">{item.system}</dd>
                            </div>
                            <div>
                              <dt className="font-medium text-gray-600">Last Updated:</dt>
                              <dd className="text-gray-900">{new Date(item.lastUpdated).toLocaleString()}</dd>
                            </div>
                          </dl>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Technical Details</h4>
                          <dl className="space-y-2 text-sm">
                            {item.metadata?.department && (
                              <div>
                                <dt className="font-medium text-gray-600">Department:</dt>
                                <dd className="text-gray-900">{item.metadata.department}</dd>
                              </div>
                            )}
                            {item.metadata?.vehicleModel && (
                              <div>
                                <dt className="font-medium text-gray-600">Vehicle Model:</dt>
                                <dd className="text-gray-900">{item.metadata.vehicleModel}</dd>
                              </div>
                            )}
                            {item.metadata?.component && (
                              <div>
                                <dt className="font-medium text-gray-600">Component:</dt>
                                <dd className="text-gray-900">{item.metadata.component}</dd>
                              </div>
                            )}
                            {item.relevanceScore && (
                              <div>
                                <dt className="font-medium text-gray-600">Relevance Score:</dt>
                                <dd className="text-gray-900">{Math.round(item.relevanceScore * 100)}%</dd>
                              </div>
                            )}
                          </dl>
                        </div>
                      </div>
                      
                      {item.content && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Content Preview</h4>
                          <p className="text-sm text-gray-600 bg-white p-3 rounded border line-clamp-3">
                            {item.content.substring(0, 300)}...
                          </p>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
