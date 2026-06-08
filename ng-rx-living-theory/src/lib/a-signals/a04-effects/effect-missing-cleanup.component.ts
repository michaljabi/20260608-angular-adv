import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-effect-missing-cleanup',
  imports: [],
  template: ` <div class="is-flex is-align-items-center is-column-gap-2 mb-3">
      <button class="button is-info" (click)="multiplier.update((m) => m + 1)">
        multiplier++ ({{ multiplier() }})
      </button>
      <span>tick: <code class="is-size-4">{{ tick() }}</code></span>
    </div>
    <p class="help">
      Każde kliknięcie dokłada kolejny interwał — <code>tick</code> przyspiesza (1/s → 2/s → 3/s…).
    </p>`,
  styles: ``,
})
export class EffectMissingCleanupComponent {
  protected readonly tick = signal(0);
  protected readonly multiplier = signal(1);

  constructor() {
    // 🪲 [Silent BUG] Odczyt multiplier() czyni go zależnością — każda zmiana
    // odpala effect PONOWNIE i startuje KOLEJNY setInterval. Stare interwały
    // nigdy nie są czyszczone, więc tykają równolegle i tick() przyspiesza.
    // Brak wyjątku — to wyciek zasobów (i baterii).
    effect(() => {
      this.multiplier();
      setInterval(() => this.tick.update((t) => t + 1), 1000);
    });

    // ✅ poprawnie: użyj onCleanup, aby zatrzymać poprzedni interwał przed
    // kolejnym przebiegiem (i przy zniszczeniu komponentu):
    //   effect((onCleanup) => {
    //     this.multiplier();
    //     const id = setInterval(() => this.tick.update((t) => t + 1), 1000);
    //     onCleanup(() => clearInterval(id));
    //   });
  }
}
