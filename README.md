# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# CarDoc AI Agent - Manufacturing Documentation Search

An intelligent React-based documentation search agent designed specifically for car manufacturing companies. The application integrates GraphQL for data fetching and Large Language Model (LLM) analysis to provide detailed insights and summaries of search results.

## 🚗 Features

- **Intelligent Search**: Advanced search across all manufacturing systems and documentation
- **AI-Powered Analysis**: LLM integration for detailed analysis and recommendations
- **Real-time Suggestions**: Smart search suggestions powered by AI
- **Advanced Filtering**: Filter by categories, systems, departments, vehicle models, and date ranges
- **Comprehensive Results**: Detailed search results with relevance scoring
- **System Integration**: GraphQL integration for seamless backend connectivity
- **Responsive Design**: Modern, accessible UI built with Tailwind CSS

## 🏭 Target Use Cases

- **Production Documentation**: Assembly procedures, quality control standards
- **Safety Protocols**: Safety guidelines, compliance requirements, emergency procedures
- **Maintenance Procedures**: Troubleshooting guides, maintenance schedules, repair instructions
- **Quality Standards**: Testing procedures, quality metrics, inspection guidelines
- **Technical Specifications**: Component details, system architectures, design standards

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **GraphQL Client**: Apollo Client
- **State Management**: TanStack Query (React Query)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **LLM Integration**: Llama API (configurable)

## 📋 Prerequisites

- Node.js 18+ and npm
- Access to a GraphQL endpoint with manufacturing documentation
- Llama API endpoint (local Ollama recommended) or alternative LLM service

## 🚀 Quick Start

1. **Clone and Setup**
   ```bash
   git clone <repository>
   cd comet-ui
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   VITE_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
   VITE_LLAMA_API_URL=http://localhost:11434/v1
   VITE_LLAMA_MODEL=llama3.1:8b
   ```

   For detailed Llama setup instructions, see our [Llama Setup Guide](./docs/LLAMA_SETUP.md).

   **Quick Ollama setup:**
   ```bash
   # Install Ollama
   curl -fsSL https://ollama.ai/install.sh | sh
   
   # Start service and download model
   ollama serve
   ollama pull llama3.1:8b
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### GraphQL Endpoint

The application expects a GraphQL endpoint that implements the schema defined in `schema.graphql`. Key requirements:

- `searchDocumentation` query for full-text search
- `systems` and `departments` queries for filter options
- Document structure with metadata for manufacturing context

### Llama Integration

The application supports multiple Llama deployment options:

**Ollama (Recommended - Local Deployment)**
```env
VITE_LLAMA_API_URL=http://localhost:11434/v1
VITE_LLAMA_MODEL=llama3.1:8b
# No API key required for local Ollama
```

**LLaMA.cpp Server**
```env
VITE_LLAMA_API_URL=http://localhost:8080/v1
VITE_LLAMA_MODEL=llama-2-7b-chat
```

**Hosted Llama Services (Together AI, Anyscale, etc.)**
```env
VITE_LLAMA_API_URL=https://api.together.xyz/v1
VITE_LLAMA_MODEL=meta-llama/Llama-2-7b-chat-hf
VITE_LLAMA_API_KEY=your_api_key
```

## 📊 Features Deep Dive

### Search Capabilities

- **Full-text Search**: Search across titles, content, and metadata
- **Faceted Search**: Filter by multiple dimensions simultaneously
- **Relevance Scoring**: AI-powered relevance scoring for results
- **Search History**: Maintain and replay previous searches

### AI Analysis

- **Automated Summarization**: Generate concise summaries of search results
- **Key Findings Extraction**: Identify critical information and insights
- **Actionable Recommendations**: Provide specific next steps and actions
- **Confidence Scoring**: Indicate reliability of AI analysis

### Manufacturing-Specific Features

- **System Classification**: Organize by production systems (Assembly, Paint, etc.)
- **Department Integration**: Filter by organizational departments
- **Severity Levels**: Categorize by criticality (Low, Medium, High, Critical)
- **Vehicle Model Mapping**: Associate with specific vehicle models and components

## 🔌 API Integration

### GraphQL Schema

See `schema.graphql` for the complete schema definition. Key types:

```graphql
type DocumentationItem {
  id: ID!
  title: String!
  content: String!
  system: String!
  category: String!
  metadata: DocumentMetadata
}

type SearchResult {
  items: [DocumentationItem!]!
  totalCount: Int!
  facets: SearchFacets!
}
```

### Sample Queries

**Basic Search**
```graphql
query SearchDocumentation {
  searchDocumentation(query: "brake system safety") {
    items {
      id
      title
      relevanceScore
      system
    }
    totalCount
  }
}
```

**Filtered Search**
```graphql
query FilteredSearch {
  searchDocumentation(
    query: "assembly procedures"
    filters: {
      category: ["Production"]
      system: ["Assembly Line"]
    }
  ) {
    items { id title }
    facets {
      categories { name count }
    }
  }
}
```

## 🎨 UI Components

### Core Components

- **SearchBar**: Advanced search interface with filters and suggestions
- **SearchResults**: Comprehensive results display with AI analysis
- **DocumentCard**: Individual document display with metadata
- **AnalysisPanel**: AI-generated insights and recommendations

### Styling

Built with Tailwind CSS featuring:
- Manufacturing-appropriate color scheme
- Responsive design for desktop and mobile
- Accessibility compliance (WCAG 2.1)
- Dark mode support (configurable)

## 🔒 Security Considerations

- API keys stored securely in environment variables
- GraphQL query validation and sanitization
- Rate limiting for LLM API calls
- Audit logging for search activities

## 📈 Performance Optimization

- Apollo Client caching for GraphQL responses
- TanStack Query for efficient state management
- Lazy loading for large document lists
- Debounced search suggestions
- Optimized bundle size with tree shaking

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run end-to-end tests
npm run test:e2e
```

## 🚀 Deployment

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### Environment-Specific Builds

```bash
# Production build
npm run build:prod

# Staging build  
npm run build:staging

# Development build
npm run build:dev
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Check the [Issues](../../issues) section
- Review the [Documentation](./docs)
- Contact the development team

## 🔄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes and updates.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
