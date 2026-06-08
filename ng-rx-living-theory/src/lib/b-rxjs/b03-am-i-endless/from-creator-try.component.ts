import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'tr[app-from-creator-try]',
  imports: [],
  template: `<td>2</td>
    <td><code>FromCreatorTryComponent</code></td>
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
export class FromCreatorTryComponent implements OnInit, OnDestroy {
  value = signal(0);
  isFinished = signal(false);
  subscription?: Subscription;

  number$ = interval(1000);

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
