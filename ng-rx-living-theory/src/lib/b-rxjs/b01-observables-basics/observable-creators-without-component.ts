// operatory of, from, interval, formEvent -> operatory tzw. KREACYJNE (tworzą observable)
// również HOT: Subject, BehaviorSubject, AsyncSubject etc.
import { Observable, of, Subject, NEVER } from 'rxjs';

// operatory tzw. instancyjne (innymi słowy, wrzucone do .pipe() innymi słowy MUSISZ mieć już Observabla instancję!)
import { map, tap, debounce, debounceTime, reduce, filter } from 'rxjs/operators'; // uwaga teraz wszystkie operatory dostępne w  from 'rxjs';

// Strumień emutujący liczby od 1 do 5
// Provider
const numbers$: Observable<number> = of(1, 8, 2);

// Consumer 1:
numbers$.subscribe({
  next: (n) => {
    console.log(n);
  },
  error: (e) => {
    console.log(e);
  },
  complete: () => {
    console.log('Completed!');
  },
});

// Consumer 2:
const sub2 = numbers$.subscribe((n) => {
  console.log('odbiorca #2:', n);
});
sub2.unsubscribe();

// Pełne API (te same emisje i sposób działania?)
const numbersFullApi$ = new Observable<number>((subscriber) => {
  // Tutaj ZABAWKI wszystkie masz - TY!
  // Ty decydujesz jak zachowuje się ten stumień
  // subscriber.complete();
  subscriber.next(1);

  // // subscriber.error('JEST BŁĄD')

  // subscriber.next(2);
  // subscriber.next(3);
  subscriber.next(4);

  setTimeout(() => {
    subscriber.next(6);

    // // ponieważ mamy WSZYSTKIE zabawki - to ja decyduje czy strumień jest skończony czy nie :)
    subscriber.complete();
  }, 2000);
  // subscriber.next(5);
});

// Consumer 2.1:
numbersFullApi$.subscribe({
  next: (n) => {
    console.log(n);
  },
  error: (e) => {
    console.log(e);
  },
  complete: () => {
    console.log('Completed!');
  },
});

// Consumer 2.2:
numbersFullApi$.subscribe((n) => {
  console.log(n);
});

// setTimeout(() => {

// }, 3000);

// Pełne API (ale) mogę emitować w dowolnym momencie

// Provider 3:
const mimicTheNumber$ = new Subject();

// ⚔️ Dodaj consumera tutaj 3.1 - i sprawdź jak działa

// Consumer 3.1:
mimicTheNumber$.subscribe((n) => {
  console.log(n);
});

mimicTheNumber$.next(1);
mimicTheNumber$.next(2);
mimicTheNumber$.next(3);
// Consumer 3.2:
mimicTheNumber$.subscribe((n) => {
  console.log(n);
});
mimicTheNumber$.next(4);
mimicTheNumber$.next(5);

// ⚔️ Dodaj consumera tutaj 3.3 - i sprawdź jak działa

// Consumer 3.3:
mimicTheNumber$.subscribe((n) => {
  console.log(n);
});
