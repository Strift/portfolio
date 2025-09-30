---
title: Building a retrieval API to search Obsidian
date: 2025-09-30
description: How I built a Retrieval-Augmented Generation API query my Obsidian vault from LibreChat.
cover: /images/articles/covers/obsidian.png
coverAlt: Obsidian logo
lang: 'en'
tags:
  - ai
  - engineering
---

# Building a retrieval API to search my Obsidian vault

I built a retrieval API on top of my Obsidian vault to allow LibreChat to search it and enable Retrieval-Augmented Generation. The system splits markdown documents into chunks, embeds them using VoyageAI, stores them in Meilisearch, and serves them via a hybrid search API that LibreChat can discover and use through function calling.

> The final repository is available here: https://github.com/Strift/obsidian-rag-api

## Architecture overview

The system has three main components:
- **Ingester**: Processes markdown files into embedded chunks
- **API Server**: Provides search endpoint with hybrid vector + text search
- **OpenAPI Spec**: Enables LLM function calling discovery

I chose Bun for TypeScript execution speed, Meilisearch for hybrid search capabilities, and VoyageAI's contextualized embeddings for better semantic understanding.

## The ingester pipeline

The ingestion process loads markdown files from `path/to/vault/`, splits them into chunks, generates embeddings, and stores everything in Meilisearch.

```typescript
// src/ingest.ts
import { loadFolder } from './lib/loader';
import { splitMarkdown } from './lib/splitter';
import { generateDocumentsEmbeddings } from './lib/embedder';
import { formatAsDocument, saveDocuments } from './lib/database';

async function ingest() {
  const documents = loadFolder('path/to/vault');

  for (const batch of documents) {
    // Split each document into chunks
    const documentsChunks = batch.map(doc => splitMarkdown(doc.content));

    // Generate embeddings for all chunks
    const embeddings = await generateDocumentsEmbeddings(documentsChunks);

    // Format and save to database
    const documents = embeddings.data.map((docEmbeddings, docIndex) => {
      return docEmbeddings.data.map((chunkEmbedding, chunkIndex) => {
        return formatAsDocument({
          chunkId: slug(`${batch[docIndex].path}-${chunkIndex}`),
          path: batch[docIndex].path,
          chunkIndex: chunkIndex,
          content: documentsChunks[docIndex][chunkIndex],
        }, chunkEmbedding.embedding);
      });
    }).flat();

    await saveDocuments(documents);
  }
}
```

### Technical choices

**Chunking**: I used `llm-text-splitter` with markdown-aware splitting to preserve document structure:

```typescript
// src/lib/splitter.ts
import { Splitter } from 'llm-text-splitter';

const splitter = new Splitter({
  splitter: 'markdown',
  removeExtraSpaces: true,
});

export function splitMarkdown(markdown: string) {
  return splitter.split(markdown).filter(chunk => chunk.length > 0);
}
```

**Embeddings**: VoyageAI's `voyage-context-3` model with contextualized embeddings processes entire documents at once, understanding relationships between chunks:

```typescript
// src/lib/embedder.ts
export async function generateDocumentsEmbeddings(chunks: string[][]) {
  const embeddings = await voyage.contextualizedEmbed({
    inputs: chunks,
    model: 'voyage-context-3',
    inputType: 'document',
    outputDimension: 1024,
  });
  return embeddings;
}
```

The nested array structure (`string[][]`) allows VoyageAI to understand that chunks belong to the same document, improving embedding quality.

**Vector database**: I’m using Meilisearch because it’s the search engine I know best. It allows easy and fast retrieval with hybrid search (semantic + full-text) and metadata filtering.

The `src/lib/database.ts` file mentioned above is a thin wrapper around [meilisearch JS SDK](https://github.com/meilisearch/meilisearch-js).

## The search server

The API server is minimal - a single POST endpoint that handles hybrid search:

```typescript
// src/server.ts
import { serve } from "bun";
import { search } from "./lib/search";

const server = serve({
  port: 4000,
  routes: {
    '/search': async (request) => {
      const { query } = await request.json();
      if (!query) return new Response('Query is required', { status: 400 });

      const result = await search(query);
      const response = Response.json(result);

      return response;
    },
  },
});
```

### Search implementation

The search function combines vector similarity with text matching through Meilisearch's hybrid search:

```typescript
// src/lib/search.ts
export async function search(query: string) {
  // Generate query embedding with Voyage AI
  const embeddings = await generateQueryEmbeddings(query);

  // Hybrid search: 50% vector, 50% text
  const results = await client.index(INDEX_NAME).search(query, {
    vector: embeddings.data[0].data[0].embedding,
    hybrid: {
      semanticRatio: 0.5,
      embedder: 'local',
    },
  });

  return results;
}
```

**Query Rewriting**: I initially implemented query rewriting, but ended up disabling it. I found current models to be good at generating effective search queries, so the added latency wasn't justified.

## LibreChat integration
### OpenAPI integration for function calling

The key to LibreChat integration is the OpenAPI spec that describes the search endpoint in a way LLMs can understand and use:

```yaml
# openapi.yaml
paths:
  /search:
    post:
      operationId: searchDocuments
      summary: Search markdown document chunks
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [query]
              properties:
                query:
                  type: string
                  description: The search query string
                  example: "authentication process"
```

The spec includes detailed examples and response schemas that help LLMs understand how to construct proper API calls:

```yaml
examples:
  successful-search:
    value:
      hits:
        - chunkId: "docs-authentication-0"
          path: "docs/authentication.md"
          content: "# Authentication\n\nThis guide covers..."
          _score: 0.95
```

### Connecting to LibreChat

I created an Agent in LibreChat with a prompt tailored for searching the vault. I also added an [action](https://www.librechat.ai/docs/features/agents#actions) that allows interacting with the API.

**Prompt**: Make sure that the agent reliably uses the API to search for information.

```md
You only use `searchDocument` from the Obsidian Vault Search API for answering personal knowledge questions. Never use your training knowledge.

If the search fails, just report it and stop.

Output should include a references footer with links to sources.
```

**Action**: You need to copy-paste your OpenAPI specification into the Schema field. Use the relevant Authentication for your system.

If you’re running LibreChat in Docker and have the Bun server running locally, you need to update the server URL as follows:

```yaml
servers:
  - url: http://host.docker.internal:4000
    description: Local development server
```

### Running the system

**Ingestion**: run `bun src/ingest.ts` as needed to process the files from the Vault
**API Server**: run `bun src/server.ts` to start the search API server on port 4000

## Wrapping up

The result is a fast, focused RAG system that makes Obsidian vaults queryable through natural language via LibreChat's function-calling capabilities.

Check out the repository for more information: https://github.com/Strift/obsidian-rag-api

### Key Design Decisions

1. **Hybrid Search**: Combining vector similarity with text matching handles both semantic queries and exact term searches
2. **Contextualized Embeddings**: VoyageAI's document-level context understanding significantly improves chunk relevance compared to independent chunk embeddings
3. **Minimal API Surface**: Single endpoint keeps complexity low and makes the OpenAPI spec simple for LLMs to understand
4. **No Authentication**: For personal use with LibreChat, complexity wasn't justified

### Improving retrieval accuracy

- Adding metadata to documents based on Obsidian folders & properties
- Generating Meilisearch filters based on query

