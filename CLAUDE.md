# Your Instructions

## Project Context

- This is a solo development project - only one developer working on it.
- The application is developed for local use only.
- Design style: The app should look exactly like a native macOS application. Match macOS design patterns, styling, and user interface conventions as closely as possible.

## Tech Stack

**Frontend:**
- React 19
- TypeScript 5.9
- Vite 7 (build tool)
- TanStack Router (routing)
- TanStack Query (data fetching)
- Zod (runtime validation)
- Tailwind CSS v4 (styling)
- shadcn/ui (component library with New York style)
- Radix UI (component primitives)
- Lucide React (icons)

**Backend:**
- JSON Server 0.17.4 (mock REST API)

**Development Tools:**
- Biome (linting and formatting)
- TypeScript compiler

## How to commit

1. Use conventional commits for all commits.
2. Add a scope that fits from the workspace.json file. You may guess which is the best one to use.
3. Add the perfect emoticon for each commit right after choosing the change type.
4. Always add a summary in the body but do not add any fluff about Claude Code or any other model.
5. After committing, do NOT push to remote. The user will push manually when ready.

 Use this format:
```txt
<type>[optional scope]: <emoticon> <description>

[body for a summary]

[optional footer(s) for breaking changes]
```
