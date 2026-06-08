import { Component } from '@angular/core';
import { interval, map, Subject, switchMap, take, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-to-signal-for-combined-streams',
  imports: [],
  template: ` <div class="card">
    <div class="card-content has-text-centered">
      <p class="heading">Emisja (toSignal)</p>
      <p class="title is-1">{{ someSignal() }}</p>
    </div>
    <footer class="card-footer">
      <button class="button is-primary card-footer-item is-radiusless" (click)="handleStart()">
        Startuj
      </button>
    </footer>
  </div>`,
  styles: ``,
})
export class ToSignalForCombinedStreamsComponent {
  // klik startuje strumień, dlatego emisje są na żądanie
  private readonly start$ = new Subject<void>();

  private readonly someRxJSStream$ = this.start$.pipe(
    // przełączenie na nowy strumień (ponieważ switch, unsub poprzedniego!), który emituje co sekundę, ale tylko 6 razy
    switchMap(() =>
      // definicja strumienia RxJS: co 1 sekundę emituj liczby od 1 do 6, a przy każdej emisji loguj ją w konsoli
      interval(1000).pipe(
        // weź tylko 6 emisji, potem odsubskrybuj
        take(6),
        // Dodaj 1, bo startujemy emisję od 0...1...2.. -> 1...2...3..
        map((v) => v + 1),
        // efekt uboczny: loguj na konsolę
        tap((v) => console.log('Emisja:', v)),
      ),
    ),
  );

  // Sygnał na podstawie strumienia RxJS:
  // toSignal automatycznie subskrybuje strumień i czyści subskrypcję przy zniszczeniu komponentu,
  // mamy początkową wartość 0, zanim cokolwiek zostanie wyemitowane
  protected readonly someSignal = toSignal(this.someRxJSStream$, {
    initialValue: 0,
  });

  handleStart() {
    this.start$.next();
  }
}
