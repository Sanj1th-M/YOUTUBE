# YOUTUBE PLATFORM - CONTRIBUTION & REPOSITORY GUIDELINES

## Branching Strategy

We follow a modular and scalable branching strategy based on **GitFlow** and **GitHub Flow** principles:

- `main`: Production-ready code only. Highly stable.
- `develop`: Integration branch for features.
- `feature/*`: New features (e.g., `feature/player-enhancement`).
- `bugfix/*`: Bug fixes (e.g., `bugfix/auth-leak`).
- `hotfix/*`: Critical production fixes.
- `release/*`: Preparation for new production releases.

## Commit Message Convention

We use **Conventional Commits** to maintain a readable and automated history:

Format: `<type>(<scope>): <description>`

### Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

### Examples:
- `feat(auth): add secure JWT rotation`
- `fix(player): resolve memory leak in Shaka Player`
- `docs(readme): update deployment instructions`
- `security(repo): harden .gitignore and protect secrets`

## Repository Hygiene Rules

1. **Never Commit Secrets**: Ensure `.env` files and private keys are never tracked.
2. **Clean Commits**: Keep commits atomic and focused.
3. **Verified Changes**: Always run tests and linting before pushing.
4. **SSDLC Compliance**: Follow secure coding practices in every PR.
5. **No Large Files**: Avoid committing large binary assets. Use external storage for media.
