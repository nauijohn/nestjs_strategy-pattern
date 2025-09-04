# Husky + lint-staged + commitlint Setup Guide for NestJS (pnpm)

This guide shows how to set up Husky hooks, lint-staged, Prettier, ESLint, and commitlint for a NestJS project using pnpm.

---

## 1️⃣ Install Dependencies

```bash
# Husky for Git hooks
pnpm add -D husky

# Lint staged files
pnpm add -D lint-staged

# Commitlint for commit message validation
pnpm add -D @commitlint/cli @commitlint/config-conventional

# ESLint + Prettier (if not already installed)
pnpm add -D eslint prettier

# pretty quick
pnpm add -D pretty-quick
```

---

## 2️⃣ Setup Husky

```bash
# Initialize Husky (v8+)
pnpm dlx husky install
```

Add `prepare` script to `package.json`:

```json
"scripts": {
  "prepare": "husky"
}
```

---

## 3️⃣ Add Husky Hooks

### Pre-commit Hook

```bash
pnpm dlx husky add .husky/pre-commit "pnpm lint-staged && pnpm lint && pnpm test"
chmod +x .husky/pre-commit
```

- Runs staged Prettier + ESLint, full lint, and tests before committing.

### Pre-push Hook (optional)

```bash
pnpm dlx husky add .husky/pre-push "pnpm lint"
chmod +x .husky/pre-push
```

- Runs full lint before pushing.

### Commit-msg Hook

```bash
# Create commit-msg hook
touch .husky/commit-msg
chmod +x .husky/commit-msg

# Add commitlint command
echo '#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
pnpm commitlint --edit "$1"' > .husky/commit-msg
```

- Validates commit messages like `feat:`, `fix:`, etc.

---

## 4️⃣ Configure lint-staged in package.json

```json
"lint-staged": {
  "src/**/*.{js,ts,jsx,tsx}": [
    "prettier --write",
    "eslint --fix"
  ],
  "src/**/*.{json,css,md}": "prettier --write"
}
```

---

## 5️⃣ Configure Husky hooks in package.json (optional for logging)

```json
"husky": {
  "hooks": {
    "applypatch-msg": "echo \"[Husky] applypatch-msg\"",
    "pre-applypatch": "echo \"[Husky] pre-applypatch\"",
    "post-applypatch": "echo \"[Husky] post-applypatch\"",
    "pre-commit": "echo \"[Husky] pre-commit\""
  }
}
```

> Actual hook logic should live in `.husky/` files.

---

## 6️⃣ Configure commitlint

Create `commitlint.config.cjs` (or `.mjs` if using ESM):

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'chore', 'docs', 'refactor', 'test'],
    ],
    'subject-case': [0],
  },
};
```

- Enforces commit message prefixes.

---

## 7️⃣ Docker/Production Builds

Disable Husky and scripts during production builds:

```dockerfile
ENV HUSKY=0
ENV NPM_CONFIG_IGNORE_SCRIPTS=true
```

- Ensures clean prod builds without Husky errors.

---

## ✅ Summary

- **Pre-commit:** staged Prettier + ESLint, lint, tests
- **Pre-push:** full lint (optional)
- **Commit-msg:** enforces commit message patterns (`feat:`, `fix:`, etc.)
- **Husky disabled in production** with environment variables
- Fully compatible with **pnpm** and **NestJS** projects
