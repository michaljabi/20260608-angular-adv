import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-effect-outside-injection-context',
  imports: [],
  template: ` <div class="notification is-warning is-light">
      <p>
        Kliknij — <code>effect()</code> wywołany w handlerze (poza injection context) rzuci
        <code>NG0203</code> (sprawdź konsolę).
      </p>
      <button class="button is-danger" (click)="handleStartEffect()">
        zobacz NG0203
      </button>
    </div>
    <p>{{ count() }}</p>`,
  styles: ``,
})
export class EffectOutsideInjectionContextComponent {
  protected readonly count = signal(0);

  // ☠️ [Runtime BUG] effect() można tworzyć tylko w injection context (konstruktor,
  // pole klasy, factory providera). Wywołanie go w handlerze zdarzenia jest już
  // POZA tym kontekstem → Angular rzuca NG0203.
  handleStartEffect() {
    effect(() => {
      // Ten kod nigdy się nie wykona — samo wywołanie effect() poniżej rzuci wyjątek.
      console.log('count =', this.count());
    });

    // ✅ poprawnie: utwórz effect() w konstruktorze...
    //   constructor() {
    //     effect(() => console.log('count =', this.count()));
    //   }
    // ...albo, jeśli naprawdę musisz odpalić go później, przekaż Injector:
    //   private readonly injector = inject(Injector);
    //   handleStartEffect() {
    //     effect(() => console.log('count =', this.count()), { injector: this.injector });
    //   }
  }
}