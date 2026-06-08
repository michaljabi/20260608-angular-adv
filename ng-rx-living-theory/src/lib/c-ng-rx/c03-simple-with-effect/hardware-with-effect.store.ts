import { effect } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';

type HardwareState = {
  availableTools: string[];
  duplicateErrorMessage: string;
};

const initialState: HardwareState = {
  availableTools: ['młotek', 'kilof', 'piła', 'klucz francuski', 'śrubokręt'],
  duplicateErrorMessage: '',
};

export const HardwareWithEffectStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    addTool(tool: string): void {
      const name = tool.trim();
      if (!name) return;
      if (store.availableTools().includes(name)) {
        patchState(store, { duplicateErrorMessage: `Narzędzie "${name}" już istnieje na liście.` });
        return;
      }
      patchState(store, (state) => ({
        availableTools: [...state.availableTools, name],
        duplicateErrorMessage: '',
      }));
    },
    removeTool(tool: string): void {
      patchState(store, (state) => ({
        availableTools: state.availableTools.filter((t) => t !== tool),
      }));
    },
    clearError(): void {
      patchState(store, { duplicateErrorMessage: '' });
    },
  })),
  // 📃 Doc: https://ngrx.io/guide/signals/signal-store/lifecycle-hooks
  withHooks({
    onInit(store) {
      // Efekt walidacji: gdy pojawi się komunikat o duplikacie,
      // automatycznie kasujemy go po 3s. Efekt reaguje na zmianę sygnału.
      effect((onCleanup) => {
        if (!store.duplicateErrorMessage()) return;
        const id = setTimeout(() => store.clearError(), 3000);
        onCleanup(() => clearTimeout(id));
      });
    },
  }),
);