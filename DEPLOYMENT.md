# Deployment Guide - CarDoc AI Agent

## 🚀 Deployment Options

### 1. Docker Deployment

#### Build Docker Image
```bash
# Build the image
docker build -t cardoc-ai-agent .

# Run the container
docker run -p 3000:3000 \
  -e VITE_GRAPHQL_ENDPOINT=http://your-graphql-endpoint/graphql \
  -e VITE_OPENAI_API_KEY=your_openai_key \
  cardoc-ai-agent
```

#### Docker Compose
```yaml
version: '3.8'
services:
  cardoc-ui:
    build: .
    ports:
      - "3000:3000"
    environment:
      - VITE_GRAPHQL_ENDPOINT=http://graphql-server:4000/graphql
      - VITE_OPENAI_API_KEY=${OPENAI_API_KEY}
    depends_on:
      - graphql-server

  graphql-server:
    image: your-graphql-server:latest
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
```

### 2. Static Hosting (Netlify, Vercel, AWS S3)

#### Build for Production
```bash
npm run build
```

#### Netlify Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### AWS S3 + CloudFront
```bash
# Sync to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### 3. Kubernetes Deployment

#### Deployment YAML
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cardoc-ai-agent
spec:
  replicas: 3
  selector:
    matchLabels:
      app: cardoc-ai-agent
  template:
    metadata:
      labels:
        app: cardoc-ai-agent
    spec:
      containers:
      - name: cardoc-ui
        image: cardoc-ai-agent:latest
        ports:
        - containerPort: 3000
        env:
        - name: VITE_GRAPHQL_ENDPOINT
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: graphql-endpoint
        - name: VITE_OPENAI_API_KEY
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: openai-api-key
---
apiVersion: v1
kind: Service
metadata:
  name: cardoc-ui-service
spec:
  selector:
    app: cardoc-ai-agent
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
```

#### ConfigMap and Secrets
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  graphql-endpoint: "http://graphql-service:4000/graphql"
---
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  openai-api-key: <base64-encoded-key>
```

### 4. Enterprise On-Premises

#### Prerequisites
- Node.js 18+ runtime environment
- Reverse proxy (Nginx/Apache)
- SSL certificates
- Monitoring and logging infrastructure

#### Production Server Setup
```bash
# Install dependencies
npm ci --only=production

# Build application
npm run build

# Install PM2 for process management
npm install -g pm2

# Start with PM2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

#### PM2 Configuration (ecosystem.config.js)
```javascript
module.exports = {
  apps: [{
    name: 'cardoc-ai-agent',
    script: 'npm',
    args: 'run preview',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      VITE_GRAPHQL_ENDPOINT: 'https://internal-graphql.company.com/graphql',
      VITE_OPENAI_API_KEY: process.env.OPENAI_API_KEY
    },
    instances: 'max',
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name cardoc.company.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name cardoc.company.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔧 Environment Configuration

### Production Environment Variables
```bash
# Required
VITE_GRAPHQL_ENDPOINT=https://api.company.com/graphql
VITE_OPENAI_API_KEY=sk-...

# Optional
VITE_LLM_API_URL=https://api.openai.com/v1
VITE_LLM_MODEL=gpt-4-turbo-preview
VITE_APP_NAME="CarDoc AI Agent"
VITE_APP_VERSION=1.0.0

# Security
VITE_ENABLE_ANALYTICS=true
VITE_SENTRY_DSN=https://...
```

### Security Configuration
```bash
# Content Security Policy
CSP_SCRIPT_SRC="'self' 'unsafe-inline'"
CSP_STYLE_SRC="'self' 'unsafe-inline'"
CSP_CONNECT_SRC="'self' https://api.openai.com https://api.company.com"

# CORS Settings (for GraphQL endpoint)
CORS_ORIGINS="https://cardoc.company.com,https://app.company.com"
```

## 📊 Monitoring and Observability

### Health Checks
```javascript
// Add to your application
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.VITE_APP_VERSION,
    uptime: process.uptime()
  });
});
```

### Logging Configuration
```javascript
// Winston logging setup
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'cardoc-ai-agent' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});
```

### Metrics Collection
```javascript
// Prometheus metrics
const prometheus = require('prom-client');

const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

const searchRequests = new prometheus.Counter({
  name: 'search_requests_total',
  help: 'Total number of search requests',
  labelNames: ['status']
});
```

## 🔐 Security Best Practices

### API Key Management
```bash
# Use secrets management
aws secretsmanager get-secret-value --secret-id cardoc/openai-key

# Environment-specific secrets
kubectl create secret generic cardoc-secrets \
  --from-literal=openai-key=$OPENAI_API_KEY
```

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               connect-src 'self' https://api.openai.com https://api.company.com;">
```

### Network Security
```yaml
# Kubernetes Network Policy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: cardoc-network-policy
spec:
  podSelector:
    matchLabels:
      app: cardoc-ai-agent
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 3000
  egress:
  - to: []
    ports:
    - protocol: TCP
      port: 443  # HTTPS only
```

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run type-check
```

#### Runtime Errors
```bash
# Check environment variables
printenv | grep VITE_

# Verify GraphQL endpoint
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __schema { types { name } } }"}' \
  $VITE_GRAPHQL_ENDPOINT
```

#### Performance Issues
```bash
# Analyze bundle size
npm run build -- --analyze

# Check memory usage
pm2 monit
```

### Debugging Steps
1. Check application logs
2. Verify environment configuration
3. Test GraphQL connectivity
4. Validate LLM API access
5. Monitor network requests
6. Check browser console for errors

## 📈 Performance Optimization

### Build Optimization
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          apollo: ['@apollo/client'],
          ui: ['lucide-react', '@headlessui/react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
```

### CDN Configuration
```bash
# Upload assets to CDN
aws s3 cp dist/assets/ s3://cdn-bucket/cardoc/ --recursive

# Update base URL
VITE_BASE_URL=https://cdn.company.com/cardoc/
```

### Caching Strategy
```nginx
# Browser caching
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Service worker caching
location /sw.js {
    expires 0;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```
