import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

const STEP_COUNT = 3;

export const AddAuctionWizardStore = signalStore(
  withState({ stepIndex: 0 }),
  withComputed(({ stepIndex }) => ({
    stepCount: computed(() => STEP_COUNT),
    isFirst: computed(() => stepIndex() === 0),
    isLast: computed(() => stepIndex() === STEP_COUNT - 1),
    progress: computed(() => (stepIndex() + 1) / STEP_COUNT),
  })),
  withMethods((store) => ({
    next() {
      patchState(store, ({ stepIndex }) => ({
        stepIndex: Math.min(stepIndex + 1, STEP_COUNT - 1),
      }));
    },
    prev() {
      patchState(store, ({ stepIndex }) => ({
        stepIndex: Math.max(stepIndex - 1, 0),
      }));
    },
    reset() {
      patchState(store, { stepIndex: 0 });
    },
  })),
);
