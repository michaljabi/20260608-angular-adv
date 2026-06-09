import { computed } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';

type HardwareState = { availableTools: string[] };

// To jest teraz:
// po 1 -> Statefull service (czyli ma dane, trzyma dane)
// po 2 -> to powinien być Single Surce of Truth dla tooli hardwerowych (dla naszego stanu) | Fasada
const initialState: HardwareState = {
  availableTools: ['młotek', 'śrubokręt', 'kluczzzz', 'wieratka'],
};

// 📃 Doc: https://ngrx.io/guide/signals/signal-store
export const HardwareStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    noOfItems: computed(() => store.availableTools().length),
  })),
  withMethods((store) => ({
    addTool: (name: string) => {
      patchState(store, (state) => ({ availableTools: [...state.availableTools, name] }));
    },
  })),
  //....różnica z naszym cart.store.ts (Tutja nie ma @Sevice() dekoratora), nie ma class tylko
  // tzw. Factory Function.
  // Ale finalnie to będzie klasa HardwareStore
  // Możemy to `injectować`
  // Możemy to `providovać` (ElementInjectorThree !)
  // innymi słowy - TO jest "Service" ale przygotowany inny API (inny lukier składniowy)
);
