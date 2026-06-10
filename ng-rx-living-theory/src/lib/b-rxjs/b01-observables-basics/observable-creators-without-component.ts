import { Observable, of, Subject } from 'rxjs';

// Strumień emutujący liczby od 1 do 5
// Provider
const numbers$: Observable<number> = of(1, 2, 3, 4, 5);

// Consumer 1:
numbers$.subscribe((n) => {
  console.log('odbiorca #1:', n);
});

// Consumer 2:
const sub2 = numbers$.subscribe((n) => {
  console.log('odbiorca #2:', n);
});
sub2.unsubscribe();

// Pełne API (te same emisje i sposób działania?)
const numbersFullApi$ = new Observable<number>((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.next(4);
  subscriber.next(5);
});

// Consumer 2.1:
numbersFullApi$.subscribe((n) => {
  console.log(n);
});

setTimeout(() => {
  // Consumer 2.2:
  numbersFullApi$.subscribe((n) => {
    console.log(n);
  });
}, 3000);

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