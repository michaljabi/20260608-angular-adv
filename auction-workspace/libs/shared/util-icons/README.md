# shared-util-icons

Kuratorowany, semantyczny katalog ikon (`@ng-icons`) dla całego workspace.

Tagi: `type:util`, `platform:web`, `scope:shared` (najniższa warstwa — mogą
zależeć od niej `ui` / `feature` / `data-access` / `api`).

## Użycie

```ts
import { provideIcons, NgIcon } from '@ng-icons/core';
import { appIcons } from '@auction-workspace/shared/util-icons';

@Component({
  imports: [NgIcon],
  viewProviders: [provideIcons({ add: appIcons.add })], // tylko to, czego użyjesz
  template: `<ng-icon name="add" />`,
})
```

Dlaczego `viewProviders` per-komponent, a nie rejestracja w root: komponent jest
samowystarczalny i działa jako Angular Element (brak root-injectora), a element
pakuje tylko swoje ikony (tree-shaking).
