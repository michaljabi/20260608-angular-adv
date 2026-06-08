import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type HardwareState = { availableTools: string[] };

const initialState: HardwareState = {
  availableTools: ['młotek', 'kilof', 'piła', 'klucz francuski', 'śrubokręt'],
};

export const HardwareWithMethodsStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    addTool(tool: string): void {
      const name = tool.trim();
      if (!name || store.availableTools().includes(name)) return;
      patchState(store, (state) => ({
        availableTools: [...state.availableTools, name],
      }));
    },
    removeTool(tool: string): void {
      patchState(store, (state) => ({
        availableTools: state.availableTools.filter((t) => t !== tool),
      }));
    },
  })),
);