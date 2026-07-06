# Contributing to AccoTrac

Thank you for your interest in contributing! AccoTrac is an open-source project and welcomes contributions of all kinds.

---

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/kamaufnjeri/AccoTrac.git
   cd AccoTrac
   ```
3. **Create a branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. Set up the development environment - see [backend README](backend/README.md) and [frontend README](frontend/README.md).

---

## Development Workflow

- Make your changes in a focused, well-named branch.
- Write clear commit messages (see below).
- Test your changes before opening a pull request.
- Open a **Pull Request** against the `main` branch.

---

## Commit Message Style

Use the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>: <short summary>

[optional body]
```

**Types:**
| Type | When to use |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `refactor` | Code change without behaviour change |
| `test` | Adding or updating tests |
| `chore` | Build process, dependencies, tooling |

**Examples:**
```
feat: add stock return endpoint
fix: correct FIFO COGS calculation for partial returns
docs: update API reference with company endpoints
```

---

## Pull Request Guidelines

- Keep PRs focused — one feature or fix per PR.
- Include a clear description of **what** the change does and **why**.
- Reference any related GitHub issues with `Closes #123`.
- Ensure the backend and frontend still build/run after your changes.

---

## Reporting Issues

- Use GitHub Issues to report bugs or suggest features.
- Include steps to reproduce, expected behaviour, and actual behaviour for bug reports.
- Label issues appropriately (`bug`, `enhancement`, `documentation`).

---

## Code Style

**Backend (Python):**
- Follow [PEP 8](https://peps.python.org/pep-0008/).
- Max line length: 120 characters.
- Use type hints where practical.

**Frontend (JavaScript/JSX):**
- Follow the existing ESLint configuration.
- Use functional components and React hooks.
- Keep components focused and small.

---

## Authors

See [AUTHORS](AUTHORS) for the full list of contributors.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
