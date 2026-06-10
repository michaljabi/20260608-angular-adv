# AuctionWorkspace

Monorepo Nx (Angular + NestJS) — aplikacja aukcyjna z koszykiem. 

> Cel: **architektura warstwowa** i **granice modułów** wymuszane przez Nx. + reguły `eslint`

## O czym jest projekt

- Domena **aukcji** (przeglądanie, kreator dodawania aukcji) + domena **koszyka**.
- Frontend: Angular 21, `@ngrx/signals` (stan), Bootstrap.
- Backend: NestJS + Drizzle ORM + SQLite (`apps/auction-api`).
- Dystrybucja UI również jako **web component** (`@angular/elements`).

## Aplikacje (`apps/`)

| App | Platforma | Rola                                                    |
|-----|-----------|---------------------------------------------------------|
| `auction-portal` | web | główna aplikacja Angular (host)                         |
| `auction-elements` | web | pakuje UI z Angular do web component (custom element) |
| `auction-api` | node | REST API (NestJS)                                       |

## Biblioteki (`libs/`)

```
libs/
  shared/   domain, ui, util-icons   ← współdzielone, bez wiedzy o domenach
  auctions/ data-access, ui, feature
  cart/     data-access, feature, api
```

## Trzy typy tagów

Każda biblioteka/app ma tagi w `project.json`. Reguły między nimi pilnuje
`@nx/enforce-module-boundaries` (patrz `eslint.config.mjs`).

### 1. `type:` — warstwa (czym kod JEST)

Określa, **co** biblioteka może importować. Od najwyższej do najniższej:

| Typ | Co to | Może importować z                            |
|-----|-------|-------------------------------------------------|
| `type:app` | aplikacja (host) | wszystkiego (`*`)                               |
| `type:feature` | logika + routing ekranu | feature, ui, data-access, domain, **api**, util |
| `type:ui` | komponenty prezentacyjne | ui, domain, util                                |
| `type:data-access` | stan + komunikacja z API | data-access, domain, util                       |
| `type:api` | **publiczny kontrakt domeny** (jedyne drzwi z zewnątrz) | api, data-access, domain, util                  |
| `type:domain` | modele / typy | domain, util                                    |
| `type:util` | czyste helpery / stałe | tylko util                                      |

Zasada: **strzałki zależności idą tylko w dół.** `util` nie zależy od nikogo.

### 2. `platform:` — środowisko uruchomienia

Zapobiega przeciekaniu kodu web ↔ node.

- `platform:web` → web, shared → front-end
- `platform:node` → node, shared → back-end
- `platform:shared` → tylko shared (działa wszędzie) → fullstack (FE + BE)

### 3. `scope:` — izolacja domen

Domeny **nie widzą się nawzajem** bezpośrednio.

- `scope:auctions` → auctions, shared, **type:api**
- `scope:cart` → cart, shared, **type:api**
- `scope:shared` → tylko shared
- `scope:portal` / `scope:api` / `scope:elements` → `*` (cienkie hosty komponujące)

## Reguła kluczowa: komunikacja między domenami

Domena rozmawia z inną **wyłącznie przez bibliotekę `type:api`**.
Np. `auctions` korzysta z koszyka tylko przez `cart/api` (`CartApi`) —
nigdy nie importuje `cart/data-access` czy `cart/feature`.

> To pojedyncze, kontrolowane „drzwi" między domenami → tzw. niski coupling.

Zobacz | 📃 Doc: [sustainable-angular-architecture](https://www.angulararchitects.io/blog/sustainable-angular-architectures-2/)

## Aliasy importów

Ścieżki w `tsconfig.base.json` w formie slash:

```ts
import { CartApi } from '@auction-workspace/cart/api';
import { Auction } from '@auction-workspace/shared/domain';
```

## Częste komendy

```sh
npx nx serve auction-portal     # dev server
npx nx serve auction-api        # backend
npx nx build auction-portal     # build produkcyjny
npx nx lint auctions-feature    # lint (sprawdza też granice modułów)
npx nx test cart-data-access    # testy (vitest)
npx nx graph                    # wizualizacja zależności
```

```sh
npx nx run-many -t build     # wybudowanie wszystkich projektów
npx nx run-many -t test      # uruchomienie wszystkich testów
```

## Dodawanie projektów

```sh
npx nx g @nx/angular:lib auctions/jakas-lib --tags=type:ui,platform:web,scope:auctions
npx nx g @nx/angular:app demo
```

Pamiętaj o nadaniu poprawnych **trzech tagów** — bez nich granice nie zadziałają.


## Dodawanie warstw domen (USER)

```bash
# serwisy, foront-endowe dane, story, logika
npx nx g @nx/angular:library --name=user-data-access --directory=libs/user/data-access --tags="type:data-access,platform:web,scope:user" --standalone --importPath=@auction-workspace/user/data-access

# dumb componenty ui, etc.
npx nx g @nx/angular:library --name=user-ui          --directory=libs/user/ui          --tags="type:ui,platform:web,scope:user"          --standalone --importPath=@auction-workspace/user/ui

# smart componenty strony, dostęp do data-access etc.
npx nx g @nx/angular:library --name=user-feature     --directory=libs/user/feature     --tags="type:feature,platform:web,scope:user"     --standalone --importPath=@auction-workspace/user/feature

# publiczne API dla innych domen:
npx nx g @nx/angular:library --name=user-api     --directory=libs/user/api     --tags="type:api,platform:web,scope:user"     --standalone --importPath=@auction-workspace/user/api
```