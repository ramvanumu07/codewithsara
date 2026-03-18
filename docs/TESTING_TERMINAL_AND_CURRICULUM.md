# Terminal & curriculum test harnesses

## 1. Playground + assignment terminal (frontend engine)

The **same** `CodeExecutor` logic as the bundled worker (`src/lib/codeExecutorEngine.js`) is exercised.

### CLI (green ✓ / red ✗, failure details)

```bash
cd frontend
npm run test:terminal-harness
```

### Jest (CI-friendly)

```bash
cd frontend
npm run test:terminal-harness:jest
```

### What is covered

- **Playground matrix** (~48 cases): empty code, `console.log`, declarations without calls, closures, syntax/reference/runtime errors, blocked `eval`/`fetch`, string `"Function"`, loops, expression-only fallback, modern syntax, etc.
- **Assignment matrix** (growing): Run-as-script, block-comment + function starters (e.g. mapFilterReduce template), script tasks with injected inputs, function tasks, `thenCallArgs` (closures), missing function, wrong outputs, syntax failures.

Extend cases in `frontend/src/lib/terminalHarness/sharedCases.js`.

### UI vs engine output

The engine returns an **empty string** when there is no `console.log` output. The Learn + Session playground UIs map that to the same label: **`Code executed (no output)`** (`formatTerminalOutput.js`).

### `Unexpected token '<'`

If the terminal shows this, the browser often tried to run **HTML** as JavaScript (e.g. worker chunk 404 → SPA `index.html`). Try a hard refresh, `npm run build` + redeploy, or run `npm run test:terminal-harness` locally—if CLI passes, the engine is fine and the issue is loading/bundling in the browser.

---

## 2. Curriculum reference solutions (backend VM)

Validates every task’s `reference_solution` against `testCases` using **`SecureCodeExecutor`** (same family as server-side validation).

```bash
# from repo root
npm run test:curriculum
# or: node backend/scripts/verify-curriculum-reference-solutions.mjs
```

- Prints **topic titles** as section headings.
- **✓** per task when all cases pass; **✗** with input / expected / actual for failures.
- Exit code **1** if any assertion fails.

**Note:** The backend sandbox is stricter than the browser worker (e.g. some patterns using `Function` may fail). Failures indicate tasks that need curriculum or executor alignment for server validation.

---

## 3. Worker bundle (production)

Code execution in the app uses a **Vite-bundled worker** (`src/workers/codeExecutor.worker.js` → `dist/assets/codeExecutor.worker-*.js`), not `public/code-executor-worker.js`.

After changing `codeExecutorEngine.js`, run `npm run build` in `frontend` and deploy.
