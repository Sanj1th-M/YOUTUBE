# Future Scalability Planning

## Service Boundaries
The current monorepo is designed to be easily split into microservices as load increases.

### 1. API Gateway
- Can be moved to a dedicated Nginx/Kong/Traefik instance.
- Handles SSL termination and global rate limiting.

### 2. Recommendation Engine
- Currently a placeholder.
- Future: Dedicated Python/Go service using vector databases (Pinecone/Milvus) for similarity search.

### 3. Search Engine
- Future: Integration with Elasticsearch or Typesense for high-performance faceted search.

### 4. Instance Manager
- Future: A standalone worker process that continuously monitors the health of the Piped network.

## Data Layer Scalability
- **PostgreSQL**: Implementation of Read Replicas and Connection Pooling (PgBouncer).
- **Redis**: Transition to a Redis Cluster for high availability.

## Horizontal Scaling
- Every service is stateless and can be containerized (Docker) and orchestrated (Kubernetes).
- Auto-scaling groups based on CPU/Memory/Request throughput.

## CDN Strategy
- Use a global CDN (Cloudflare/AWS CloudFront) for:
  - Static frontend assets.
  - Cached video metadata.
  - Thumbnail proxying.
