import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-simple-usage-of-effect',
  imports: [],
  template: ` <div class="is-flex is-justify-content-center is-align-items-center is-column-gap-2">
      <button class="button is-warning" (click)="handleUpdateCount(-10)">-</button>
      <code class="is-4">{{ count() }}</code>
      <button class="button is-success" (click)="handleUpdateCount(10)">+</button>
    </div>
    <p>{{ message }}</p>`,
  styles: ``,
})
export class SimpleUsageOfEffectComponent {
  protected message = '';
  protected readonly count = signal(230);

  constructor() {
    // 🤔 Czy użycie tego effect() jest tutaj uzasadnione?
    // 📃 Doc: https://angular.dev/guide/signals/effect
    effect(() => {
      const currentCount = this.count(); // count() staje się "zależnością" tego effectu, więc każda jego zmiana odpali ten kod ponownie!
      this.message =
        currentCount > 250
          ? 'Liczba przekroczyła 250!'
          : currentCount < 220
            ? 'Liczba jest poniżej 220!'
            : '';
    });
  }

  handleUpdateCount(value: number) {
    this.count.update((c) => c + value);
  }
}
