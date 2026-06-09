import { Observable, of } from 'rxjs';

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
  console.log('odbiorca #2.1:', n);
});

// Consumer 2.2:
numbersFullApi$.subscribe((n) => {
  console.log('odbiorca #2.2:', n);
});