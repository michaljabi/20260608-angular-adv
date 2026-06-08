import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'tr[app-first-try]',
  imports: [],
  template: ` <td>1</td>
    <td><code>FirstTryComponent</code></td>
    <td>{{ value() }}</td>
    <td>
      @if (isFinished()) {
        <span class="tag is-success">Tak</span>
      } @else {
        <span class="tag is-warning">Nie</span>
      }
    </td>`,
})
export class FirstTryComponent implements OnInit, OnDestroy {
  value = signal(0);
  isFinished = signal(false);
  subscription?: Subscription;

  number$ = new Observable<number>((subscriber) => {
    let value = 1;
    const int = setInterval(() => {
      subscriber.next(value++);
      // Po emisji (5) - bo 6 to już po ++, zatrzymaj interwał
      if (value === 6) {
        clearInterval(int);
      }
    }, 1000);
  });

  ngOnInit() {
    this.subscription = this.number$.subscribe({
      next: (value) => this.value.set(value),
      complete: () => this.isFinished.set(true),
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
