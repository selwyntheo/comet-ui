# Llama Setup Guide for CarDoc AI Agent

This guide will help you set up Llama (via Ollama) for the CarDoc AI Agent application.

## Prerequisites

- macOS, Linux, or Windows
- At least 8GB RAM (16GB recommended for larger models)
- Docker (optional, for containerized deployment)

## Method 1: Ollama Installation (Recommended)

### Step 1: Install Ollama

**macOS:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

**Linux:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

**Windows:**
Download and run the installer from [ollama.ai](https://ollama.ai)

### Step 2: Start Ollama Service

```bash
ollama serve
```

This will start the Ollama server on `http://localhost:11434`

### Step 3: Download a Llama Model

**For general use (recommended):**
```bash
ollama pull llama3.1:8b
```

**For better performance with more resources:**
```bash
ollama pull llama3.1:70b
```

**For faster responses with lower quality:**
```bash
ollama pull llama3.1:7b
```

### Step 4: Test the Installation

```bash
curl http://localhost:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3.1:8b",
    "messages": [
      {
        "role": "user",
        "content": "Hello, can you analyze automotive manufacturing data?"
      }
    ]
  }'
```

### Step 5: Configure CarDoc AI Agent

Update your `.env` file:
```env
VITE_LLAMA_API_URL=http://localhost:11434/v1
VITE_LLAMA_MODEL=llama3.1:8b
# No API key needed for local Ollama
VITE_LLAMA_API_KEY=
```

## Method 2: Docker Deployment

### Step 1: Pull Ollama Docker Image

```bash
docker pull ollama/ollama
```

### Step 2: Run Ollama Container

```bash
docker run -d \
  --name ollama \
  -p 11434:11434 \
  -v ollama:/root/.ollama \
  ollama/ollama
```

### Step 3: Download Model in Container

```bash
docker exec -it ollama ollama pull llama3.1:8b
```

## Method 3: LLaMA.cpp Server

### Step 1: Clone and Build LLaMA.cpp

```bash
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
make
```

### Step 2: Download Model Weights

Download a GGUF format model from Hugging Face:
```bash
wget https://huggingface.co/microsoft/DialoGPT-medium/resolve/main/model.gguf
```

### Step 3: Start Server

```bash
./server -m model.gguf --host 0.0.0.0 --port 8080
```

### Step 4: Configure Application

```env
VITE_LLAMA_API_URL=http://localhost:8080/v1
VITE_LLAMA_MODEL=llama-2-7b-chat
```

## Method 4: Hosted Llama Services

### Together AI

1. Sign up at [together.ai](https://together.ai)
2. Get your API key
3. Configure:

```env
VITE_LLAMA_API_URL=https://api.together.xyz/v1
VITE_LLAMA_MODEL=meta-llama/Llama-2-7b-chat-hf
VITE_LLAMA_API_KEY=your_together_api_key
```

### Anyscale

1. Sign up at [anyscale.com](https://anyscale.com)
2. Get your API key
3. Configure:

```env
VITE_LLAMA_API_URL=https://api.endpoints.anyscale.com/v1
VITE_LLAMA_MODEL=meta-llama/Llama-2-7b-chat-hf
VITE_LLAMA_API_KEY=your_anyscale_api_key
```

## Troubleshooting

### Common Issues

**Ollama not starting:**
- Check if port 11434 is available
- Restart the ollama service: `ollama serve`

**Model not found:**
- Verify the model is pulled: `ollama list`
- Pull the model if missing: `ollama pull llama3.1:8b`

**Connection refused:**
- Ensure Ollama service is running
- Check firewall settings
- Verify the correct port in configuration

**Slow responses:**
- Consider using a smaller model (7b instead of 70b)
- Increase system RAM
- Use GPU acceleration if available

### Performance Optimization

**Enable GPU acceleration (NVIDIA):**
```bash
# Install CUDA support for Ollama
ollama pull llama3.1:8b
# GPU will be used automatically if available
```

**Memory management:**
```bash
# Set memory limit for Ollama
export OLLAMA_HOST=0.0.0.0:11434
export OLLAMA_MAX_MEMORY=8GB
ollama serve
```

### Monitoring

**Check Ollama logs:**
```bash
# View Ollama service logs
journalctl -u ollama.service -f
```

**Monitor resource usage:**
```bash
# Check memory and CPU usage
htop
# GPU usage (if applicable)
nvidia-smi
```

## Model Recommendations

| Use Case | Model | RAM Required | Quality | Speed |
|----------|-------|--------------|---------|--------|
| Development/Testing | llama3.1:7b | 8GB | Good | Fast |
| Production (Balanced) | llama3.1:8b | 12GB | Very Good | Medium |
| High Quality Analysis | llama3.1:70b | 64GB | Excellent | Slow |
| Code Generation | codellama:7b | 8GB | Good (Code) | Fast |

## Security Considerations

- Keep Ollama service behind a firewall for production use
- Consider authentication for hosted deployments
- Monitor API usage and implement rate limiting
- Regularly update Ollama and models for security patches

## Support

For issues with:
- **Ollama**: Visit [ollama.ai documentation](https://ollama.ai/docs)
- **LLaMA.cpp**: Check [GitHub repository](https://github.com/ggerganov/llama.cpp)
- **CarDoc AI Agent**: Check the main application documentation
