# Security Architecture & Threat Model

## SSDLC Principles
1. **Secure by Design**: Defaults are secure (e.g., closed by default CORS).
2. **Least Privilege**: Services only have access to what they need.
3. **Defense in Depth**: Multiple layers of security (WAF, Rate Limiting, Validation).

## Threat Model

| Threat | Risk | Mitigation |
|---|---|---|
| **SSRF** | High | Strict whitelist of Piped instance domains; No user-provided URLs in proxy calls. |
| **API Abuse** | Medium | Rate limiting per IP and per User; API Keys for internal service communication. |
| **DDoS** | High | Redis caching to reduce backend load; Cloudflare/WAF at the edge. |
| **Token Theft** | Medium | HttpOnly, Secure, SameSite cookies for JWTs; Short-lived tokens. |
| **SQL Injection** | Low | Use of ORM/Query Builder with parameterized queries (Prisma or Knex). |
| **XSS** | Medium | React's automatic escaping; Content Security Policy (CSP). |
| **Proxy Abuse** | Medium | Validation of all outgoing requests from the Instance Manager. |

## Security Controls
- **Authentication**: JWT based, stored in secure cookies.
- **Input Validation**: Joi/Zod schemas for every endpoint.
- **Logging**: Centralized logging (Winston/Morgan) with PII masking.
- **Secret Management**: Vault or Environment Variables (sealed).
