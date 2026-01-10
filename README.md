# expe21enceyses

## 🚨 Developers — Eyes Here 🚨

The rules below are **not optional** and exist to keep the project stable and traceable.

### 🌿 Branch Naming Convention
All personal branches **must** follow this format:

```
<surname>-<feature>
```

### Main Branch Protection
- **Only the PM merges into the `main` branch**
- Direct commits to `main` are not allowed
- All changes must go through the defined PR flow

---

### Pull Request & Merge Flow
1. Create your feature branch from the appropriate base
2. Open a Pull Request **to the staging branch**
   - Frontend → `app-stg`
   - Backend → `api-stg`
3. After validation and approval from the TL, the PM will merge staging into `main`

> **No PRs should target `main` directly**
