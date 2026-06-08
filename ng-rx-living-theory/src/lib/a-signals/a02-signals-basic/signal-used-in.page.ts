import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { PageComponent } from '../../common/page/page.component';

@Component({
  selector: 'app-signal-used-in',
  imports: [PageComponent],
  template: `<app-page
    pageTitle="Podstawy sygnałów"
    pageDescription="Sygnał to reaktywne pudełko na wartość. Odczytujemy go wywołaniem count(), a zmieniamy przez set() lub update(). Każda zmiana automatycznie odświeża szablon."
    fileMatch="a-signals/a02-signals-basic/signal-used-in.page"
  >
    <div class="is-flex is-justify-content-center is-align-items-center is-column-gap-2">
      <button class="button is-warning" (click)="handleUpdateCount(-2)">-</button>
      <div class="title is-4 my-auto">{{ count() }}</div>
      <button class="button is-success" (click)="handleUpdateCount(2)">+</button>
      <button class="button" (click)="setValue(100)">ustaw <code class="ml-3">100</code></button>
    </div>
    <div>
      {{ message() }}
    </div>
  </app-page>`,
  styles: ``,
})
export class SignalUsedInPage implements OnInit {

  // 📃 Doc: https://angular.dev/guide/signals#writable-signals
  count = signal(200);

  // refactoring:
  // message = computed(() => this.count() > 200 ? 'To za wysoko!' : '')
  message = computed(() => {
    // --- Reactive context --->
    const value = this.count();
    if(value > 200) {
      return 'To za wysoko!';
    }
    return '';
    // <---- Reactive context
  })

  constructor() {
    // setTimeout(() => {
    //   this.count.set(0)
    // }, 4000)
    // console.log(this.count.asReadonly())
    effect(() => {
      // --- Reactive context --->

      // Doc: https://angular.dev/guide/signals#reactive-context-and-async-operations
      console.log('Zmiana sygnału', this.count(), this.message() )

      // <---- Reactive context
    })
  }

  ngOnInit(): void {
    setTimeout(() => {

      // żeby to zadziałało - potrzebujemy "linkedSignal".
      // this.message.set(' ja też się zmieniam')
    }, 4000)
  }

  handleUpdateCount(value: number) {
    this.count.update((c) => c + value);
  }

  setValue(value: number) {
    this.count.set(value);
  }

  // ⚔️ Sidequest: sprawdź, czy rozumiesz koncepcję signal
  // Napisz logikę do resetowania licznika na 0, która uruchomi się za 4 sekundy.

  // ⚔️ Sidequest2 : sprawdź, czy rozumiesz koncepcję computed
  // Napisz logikę computed, która zaktualizuje message na podstawie `count`,
  // Jeśli `count` będzie zbyt duże (> 200) napisz: 'To za wysoko',
  // Warunek umieść w środku callback do computed()
}
