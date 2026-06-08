import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-effect-infinite-loop',
  imports: [],
  template: ` <p>{{ count() }}</p>`,
  styles: ``,
})
export class EffectInfiniteLoopComponent {
  protected readonly count = signal(0);

  constructor() {
    // ☠️ [Runtime BUG] effect() ODCZYTUJE count(), więc count() staje się jego
    // zależnością. Wewnątrz Zapisujemy count() → zmiana znów odpala effect →
    // pętla. Angular wykrywa cykl i rzuca błąd ("maximum ... exceeded"). (o ile przeglądarka się nie zawiesi!)
    effect(() => {
      this.count.set(this.count() + 1);
    });

    // ✅ poprawnie: nie zapisuj sygnału, który czytasz w tym samym effekcie.
    //   - jeśli chcesz WYLICZYĆ wartość z innego sygnału → użyj computed():
    //       readonly doubled = computed(() => this.count() * 2);
    //   - jeśli musisz zapisać, czytaj źródło przez untracked(), aby nie tworzyć
    //     zależności od zapisywanego sygnału:
    //       effect(() => this.count.set(untracked(this.count) + 1)); // brak pętli
  }
}