# Environment Configuration Structure

## Global Variables
| Variable | Description | Source |
|---|---|---|
| `NODE_ENV` | production, development, test | Shell |
| `LOG_LEVEL` | debug, info, warn, error | Shell |

## Backend Configuration
- `PORT`: Port the API runs on.
- `DATABASE_URL`: PostgreSQL connection string.
- `REDIS_URL`: Redis connection string.
- `JWT_SECRET`: Secret for signing authentication tokens.
- `PIPED_WHITELIST`: Comma-separated list of allowed Piped domains.
- `RATE_LIMIT_MAX`: Max requests per window.

## Frontend Configuration
- `VITE_API_BASE_URL`: URL of the Backend API Gateway.
- `VITE_GA_ID`: Google Analytics (Optional).
- `VITE_ENABLE_NOTIFICATIONS`: Feature flag.

## Security Note
- Use `.env` for local development.
- Use CI/CD Secrets (GitHub Actions/GitLab CI) for production.
- **Never** commit `.env` files to the repository.
