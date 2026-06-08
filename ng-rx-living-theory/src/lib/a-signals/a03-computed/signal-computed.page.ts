import { Component, computed, signal } from '@angular/core';
import { PageComponent } from '../../common/page/page.component';

@Component({
  selector: 'app-signal-computed',
  imports: [PageComponent],
  template: `<app-page
    pageTitle="Computed (wartości pochodne)"
    pageDescription="computed() tworzy sygnał wyliczany z innych sygnałów. Przelicza się leniwie i tylko wtedy, gdy zmieni się któraś z zależności — tu na podstawie count()."
    fileMatch="a-signals/a03-computed/signal-computed.page"
  >
    <div class="is-flex is-justify-content-center is-align-items-center is-column-gap-2">
      <button class="button is-warning" (click)="handleUpdateCount(-1)">-</button>
      <code class="is-4">{{ count() }}</code>
      <button class="button is-success" (click)="handleUpdateCount(1)">+</button>
    </div>
    <div>
      <p>
        Wartość podwojona: <code>{{ computedCount() }}</code>
      </p>
      <p>
        Wartość poniesiona do potęgi: <code>{{ exponentialCount() }}</code>
      </p>
    </div>
  </app-page>`,
  styles: ``,
})
export class SignalComputedPage {
  count = signal(2);

  // Na podstawie istniejącego sygnału, można tworzyć inne np. readonly:
  readonlyCount = this.count.asReadonly();

  // Tutaj computed jest tylko "readonly" ale z dodatkową logiką do przeliczenia.
  // 📃 Doc: https://angular.dev/guide/signals#computed-signals
  // ten sygnał przeliczy się "automagicznie" przy każdej zmianie count() i będzie miał zawsze aktualną wartość
  computedCount = computed(() => this.count() * 2);
  exponentialCount = computed(() => this.count() * this.count());

  handleUpdateCount(value: number) {
    this.count.update((c) => c + value);
  }

  // ⚔️ Sidequest: sprawdź, czy rozumiesz koncepcję
  // Napisz logikę do resetowania licznika na 0, która uruchomi się za 4 sekundy.
}
