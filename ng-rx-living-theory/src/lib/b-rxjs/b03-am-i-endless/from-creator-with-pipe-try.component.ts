import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { interval, map, Subscription, take } from 'rxjs';

@Component({
  selector: 'tr[app-from-creator-with-pipe-try]',
  imports: [],
  template: `<td>3</td>
    <td><code>FromCreatorWithPipeTryComponent</code></td>
    <td>{{ value() }}</td>
    <td>
      @if (isFinished()) {
        <span class="tag is-success">Tak</span>
      } @else {
        <span class="tag is-warning">Nie</span>
      }
    </td>`,
  styles: ``,
})
export class FromCreatorWithPipeTryComponent implements OnInit, OnDestroy {
  value = signal(0);
  isFinished = signal(false);
  subscription?: Subscription;

  number$ = interval(1000).pipe(
    map((v) => v + 1),
    take(5),
  );

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
