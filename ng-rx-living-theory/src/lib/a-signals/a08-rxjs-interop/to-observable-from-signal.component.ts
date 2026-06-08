import { Component, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-to-observable-from-signal',
  imports: [AsyncPipe],
  template: ` <div class="card">
    <div class="card-content has-text-centered">
      <p class="heading">Basic <code>toObservable</code></p>
      <p class="title is-1">{{ numbers$ | async }}</p>
    </div>
  </div>`,
  styles: ``,
})
export class ToObservableFromSignalComponent implements OnInit {
  private readonly numbers = signal(10);
  private intervalId: any;

  // 📃 Doc: https://angular.dev/ecosystem/rxjs-interop#create-an-rxjs-observable-from-a-signal-with-toobservable
  // Zauważ, że po przejściu przez toObservable() można dodać `.pipe()` dostajemy pełnoprawną instancję Observable,
  // Co więcej ten strumień ma "Zaszyte jakby" startWith(10),
  // bo to jest aktualna wartość sygnału w momencie tworzenia Observable.
  // Dlatego w template od razu widzimy 10, a potem co sekundę kolejne wartości.
  protected readonly numbers$ = toObservable(this.numbers).pipe(take(4));

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.numbers.update((n) => n + 10);
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
