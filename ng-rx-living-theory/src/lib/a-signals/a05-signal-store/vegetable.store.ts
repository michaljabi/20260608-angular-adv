import { computed, Injectable, signal } from '@angular/core';

@Injectable()
export class VegetableStore {
  #vegetables = signal(['lettuce', 'tomato', 'cucumber']);
  // odcinamy mu możliwość edycji
  vegetables = this.#vegetables.asReadonly();

  // możemy też na bazie vegetables utworzyć sygnał, który będzie liczył ilość warzyw:
  numberOfVegetables = computed(() => this.#vegetables().length);

  // metoda do dodawania elementu do naszej listy warzyw:
  add(veggie: string): void {
    // Zaktualizuj sygnał o nowe warzywo:
    this.#vegetables.update((vegetables) => [...vegetables, veggie]);
  }

  removeAll(): void {
    // Ustaw sygnał, aby usunąć wszystkie warzywa:
    this.#vegetables.set([]);
  }
}
