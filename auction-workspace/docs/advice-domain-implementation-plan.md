# "Podpowiadamy" — frontend advices feature

## Context for next session

- Monorepo: Nx v22.7.5
- Frontend: `apps/auction-portal` — Angular 21.2.0, standalone components, no NgModules
- Backend: `apps/auction-api` — NestJS 11, Express platform, SQLite + Drizzle ORM
- CSS: Bootstrap 5.3
- HTTP: `HttpClient` with `fetch`, proxy `/api` → `http://localhost:3200` (proxy.conf.json)
- State: `httpResource()` for read (signal-based reactive), `HttpClient` for writes

## Backend state (already done, no changes needed)

| Endpoint | Returns |
|----------|---------|
| `GET /api/advices` | `AdviceSummary[]` (`{ uid, title }[]`) |
| `GET /api/advices/:uid` | `Advice` (`{ uid, title, postedArticle }`) |

- Seeds: 4 advices in Polish (komputer, zegarek, licytacja, wysyłka)
- Module `AdvicesModule` imported in `AppModule`
- Migration `0001_violet_wildside.sql` already applied

---

## Implementation steps

### Step 1: Add Advice types to shared domain

**File:** `libs/shared/domain/src/lib/advice.ts` (NEW)

```typescript
export interface AdviceSummary {
  uid: string;
  title: string;
}

export interface Advice extends AdviceSummary {
  postedArticle: string;
}
```

**File:** `libs/shared/domain/src/index.ts` (EDIT — add export)

```typescript
export * from './lib/auction';
export * from './lib/advice';
```

---

### Step 2: Generate the advices feature library

Run from workspace root (`D:\workspace\auction-workspace`):

```powershell
npx nx g @nx/angular:lib advices/feature `
  --directory=libs/advices/feature `
  --standalone `
  --skip-module `
  --tags=type:feature,platform:web,scope:advices `
  --no-interactive
```

Then **delete** generated files we won't use:
- `libs/advices/feature/src/lib/advices-feature/advices-feature.component.ts`
- `libs/advices/feature/src/lib/advices-feature/advices-feature.component.spec.ts`

And update `libs/advices/feature/src/index.ts` to:

```typescript
export * from './lib/advices.routes';
```

---

### Step 3: Add path alias in tsconfig.base.json

**File:** `tsconfig.base.json` — add entry inside `compilerOptions.paths`:

```json
"@auction-workspace/advices/feature": ["./libs/advices/feature/src/index.ts"]
```

---

### Step 4: Create the data-access service

**File:** `libs/advices/feature/src/lib/advices-resource.service.ts` (NEW)

```typescript
import { Injectable, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Advice, AdviceSummary } from '@auction-workspace/shared/domain';

@Injectable({ providedIn: 'root' })
export class AdvicesResourceService {
  #endpoint = '/api/advices';

  getAll() {
    return httpResource<AdviceSummary[]>(() => this.#endpoint, {
      defaultValue: [],
    });
  }

  getOne(uid: string) {
    return httpResource<Advice>(
      () => `${this.#endpoint}/${uid}`,
      { defaultValue: undefined },
    );
  }
}
```

---

### Step 5: Create the list page

**File:** `libs/advices/feature/src/lib/advice-list-page/advice-list-page.ts` (NEW)

```typescript
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdvicesResourceService } from '../advices-resource.service';

@Component({
  selector: 'lib-advice-list-page',
  imports: [RouterLink],
  template: `
    <section>
      <h2>Podpowiadamy</h2>
      <div class="row g-3">
        @if (advices.error()) {
          <div class="col-12 alert alert-danger">Niestety wystąpił błąd…</div>
        }
        @if (advices.isLoading()) {
          <div class="col-12 alert alert-info">Ładuję porady…</div>
        }
        @for (a of advices.value(); track a.uid) {
          <div class="col-12 col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ a.title }}</h5>
                <a class="btn btn-outline-primary" [routerLink]="a.uid">
                  Czytaj więcej
                </a>
              </div>
            </div>
          </div>
        } @empty {
          @if (!advices.isLoading()) {
            <div class="col-12 alert alert-warning">Brak porad.</div>
          }
        }
      </div>
    </section>
  `,
})
export class AdviceListPage {
  private readonly resource = inject(AdvicesResourceService);
  protected readonly advices = this.resource.getAll();
}
```

---

### Step 6: Create the detail page

**File:** `libs/advices/feature/src/lib/advice-page/advice-page.ts` (NEW)

```typescript
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdvicesResourceService } from '../advices-resource.service';

@Component({
  selector: 'lib-advice-page',
  imports: [RouterLink],
  template: `
    <section>
      <a class="btn btn-outline-secondary mb-3" routerLink="/advices">
        &larr; Powrót do listy
      </a>
      @if (advice.error()) {
        <div class="col-12 alert alert-danger">Nie znaleziono porady.</div>
      }
      @if (advice.isLoading()) {
        <div class="col-12 alert alert-info">Ładuję poradę…</div>
      }
      @if (advice.value(); as a) {
        <article>
          <h2>{{ a.title }}</h2>
          @for (paragraph of a.postedArticle.split('\n'); track $index) {
            <p>{{ paragraph }}</p>
          }
        </article>
      }
    </section>
  `,
})
export class AdvicePage {
  #route = inject(ActivatedRoute);
  #resource = inject(AdvicesResourceService);
  #uid = this.#route.snapshot.paramMap.get('uid') ?? '';
  protected readonly advice = this.#resource.getOne(this.#uid);
}
```

---

### Step 7: Create routes config

**File:** `libs/advices/feature/src/lib/advices.routes.ts` (NEW)

```typescript
import { Routes } from '@angular/router';
import { AdviceListPage } from './advice-list-page/advice-list-page';
import { AdvicePage } from './advice-page/advice-page';

export const routes: Routes = [
  { path: '', component: AdviceListPage },
  { path: ':uid', component: AdvicePage },
];
```

---

### Step 8: Update app routes

**File:** `apps/auction-portal/src/app/app.routes.ts` (EDIT)

Add lazy route for `advices`:

```typescript
{
  path: 'advices',
  loadChildren: () =>
    import('@auction-workspace/advices/feature').then((m) => m.routes),
},
```

Insert it after the `cart` route block, before the wildcard `'**'` route.

---

### Step 9: Add menu item

**File:** `apps/auction-portal/src/app/app.ts` (EDIT)

Add entry to `menuItems` array:

```typescript
{ name: 'Aukcje', link: '/auctions' },
{ name: 'Promocje', link: '/auctions/promotions' },
{ name: 'Podpowiadamy', link: '/advices' },
```

---

### Step 10: Update project.json

**File:** `libs/advices/feature/project.json` — verify it has:

```json
{
  "name": "advices-feature",
  "$schema": "../../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/advices/feature/src",
  "prefix": "lib",
  "projectType": "library",
  "tags": ["type:feature", "platform:web", "scope:advices"],
  "targets": {
    "lint": {
      "executor": "@nx/eslint:lint"
    }
  }
}
```

---

### Step 11: Verify

1. `npx nx lint advices-feature`
2. `npx nx build auction-portal` (or `npx nx build auction-portal --configuration=development` for faster check)
3. Start backend: `npx nx serve auction-api`
4. Start frontend in another terminal: `npx nx serve auction-portal`
5. Open browser → verify:
   - Menu shows "Podpowiadamy"
   - Clicking it shows list of 4 advices
   - Clicking "Czytaj więcej" shows full article text
   - Back button returns to list

---

## Files to create (3)

| # | Path | Action |
|---|------|--------|
| 1 | `libs/shared/domain/src/lib/advice.ts` | CREATE |
| 2 | `libs/advices/feature/src/lib/advices-resource.service.ts` | CREATE |
| 3 | `libs/advices/feature/src/lib/advice-list-page/advice-list-page.ts` | CREATE |
| 4 | `libs/advices/feature/src/lib/advice-page/advice-page.ts` | CREATE |
| 5 | `libs/advices/feature/src/lib/advices.routes.ts` | CREATE |
| 6 | `libs/advices/feature/src/index.ts` | CREATE (overwrite generated) |

## Files to edit (4)

| # | Path | Change |
|---|------|--------|
| 1 | `libs/shared/domain/src/index.ts` | Add export of `advice.ts` |
| 2 | `apps/auction-portal/src/app/app.routes.ts` | Add `/advices` lazy route |
| 3 | `apps/auction-portal/src/app/app.ts` | Add `{ name: 'Podpowiadamy', link: '/advices' }` to menuItems |
| 4 | `tsconfig.base.json` | Add path alias for `@auction-workspace/advices/feature` |
