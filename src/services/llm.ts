import type { DocumentationItem, LLMAnalysis } from '../types';

interface LLMRequest {
  prompt: string;
  temperature?: number;
  maxTokens?: number;
}

interface LLMResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class LLMService {
  private apiKey: string;
  private baseUrl: string;
  private model: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    this.baseUrl = import.meta.env.VITE_LLM_API_URL || 'https://api.openai.com/v1';
    this.model = import.meta.env.VITE_LLM_MODEL || 'gpt-4-turbo-preview';
  }

  private async makeRequest(request: LLMRequest): Promise<LLMResponse> {
    if (!this.apiKey) {
      throw new Error('LLM API key is not configured');
    }

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: `You are an expert analyst for a car manufacturing company. You analyze technical documentation and provide detailed, actionable insights. Focus on safety, quality, production efficiency, and compliance with automotive standards.`
          },
          {
            role: 'user',
            content: request.prompt
          }
        ],
        temperature: request.temperature || 0.3,
        max_tokens: request.maxTokens || 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`LLM API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  async analyzeSearchResults(
    query: string,
    documents: DocumentationItem[]
  ): Promise<LLMAnalysis> {
    if (!documents.length) {
      return {
        summary: 'No documents found for the given query.',
        keyFindings: [],
        recommendations: [],
        relevantDocuments: [],
        confidence: 0,
        analysisTimestamp: new Date().toISOString(),
      };
    }

    const documentSummaries = documents.map(doc => ({
      id: doc.id,
      title: doc.title,
      system: doc.system,
      category: doc.category,
      summary: doc.content.substring(0, 500) + (doc.content.length > 500 ? '...' : ''),
      metadata: doc.metadata,
    }));

    const prompt = `
Analyze the following search results for the query: "${query}"

Documents found:
${documentSummaries.map((doc, index) => `
${index + 1}. Title: ${doc.title}
   System: ${doc.system}
   Category: ${doc.category}
   Department: ${doc.metadata?.department || 'Not specified'}
   Vehicle Model: ${doc.metadata?.vehicleModel || 'Not specified'}
   Component: ${doc.metadata?.component || 'Not specified'}
   Severity: ${doc.metadata?.severity || 'Not specified'}
   Summary: ${doc.summary}
   Document ID: ${doc.id}
`).join('\n')}

Provide a comprehensive analysis in the following JSON format:
{
  "summary": "A detailed 2-3 paragraph summary of the key information found",
  "keyFindings": ["List of 3-5 most important findings from the documents"],
  "recommendations": ["List of 3-5 actionable recommendations based on the findings"],
  "relevantDocuments": ["List of document IDs that are most relevant to the query"],
  "confidence": "A number between 0-1 indicating confidence in the analysis"
}

Focus on:
- Safety implications and compliance requirements
- Quality control measures and standards
- Production efficiency opportunities
- Maintenance and troubleshooting guidance
- Cross-system dependencies and impacts
- Regulatory compliance considerations

Ensure the analysis is specific to car manufacturing processes and automotive industry standards.
    `;

    try {
      const response = await this.makeRequest({ prompt });
      const content = response.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('No content received from LLM');
      }

      // Extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in LLM response');
      }

      const analysis = JSON.parse(jsonMatch[0]);
      
      return {
        ...analysis,
        analysisTimestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error analyzing search results:', error);
      
      // Fallback analysis
      return {
        summary: `Analysis of ${documents.length} documents for query "${query}". Error occurred during LLM analysis: ${error instanceof Error ? error.message : 'Unknown error'}`,
        keyFindings: documents.slice(0, 3).map(doc => `Found relevant information in ${doc.title} (${doc.system})`),
        recommendations: ['Review the found documents manually', 'Contact relevant departments for clarification', 'Consider expanding search terms'],
        relevantDocuments: documents.slice(0, 5).map(doc => doc.id),
        confidence: 0.3,
        analysisTimestamp: new Date().toISOString(),
      };
    }
  }

  async generateSearchSuggestions(query: string): Promise<string[]> {
    const prompt = `
Generate 5 relevant search suggestions for a car manufacturing company's documentation system based on this query: "${query}"

Consider these areas:
- Production processes and assembly lines
- Quality control and testing procedures
- Safety protocols and compliance
- Vehicle components and systems
- Maintenance and troubleshooting
- Supplier and logistics information
- Regulatory requirements

Return only a JSON array of strings, no additional text:
["suggestion1", "suggestion2", "suggestion3", "suggestion4", "suggestion5"]
    `;

    try {
      const response = await this.makeRequest({ prompt, temperature: 0.7, maxTokens: 200 });
      const content = response.choices[0]?.message?.content;
      
      if (!content) {
        return [];
      }

      const suggestions = JSON.parse(content);
      return Array.isArray(suggestions) ? suggestions : [];
    } catch (error) {
      console.error('Error generating search suggestions:', error);
      return [];
    }
  }
}

export const llmService = new LLMService();
