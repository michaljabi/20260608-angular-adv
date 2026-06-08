import { signalStore, withState } from '@ngrx/signals';

type HardwareState = { availableTools: string[] };

const initialState: HardwareState = {
  availableTools: ['młotek', 'śrubokręt', 'klucz'],
};

// 📃 Doc: https://ngrx.io/guide/signals/signal-store
export const HardwareStore = signalStore(withState(initialState))