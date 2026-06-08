import { Component, OnDestroy, signal } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-subsciption-control-interval',
  imports: [],
  template: `<div class="is-flex is-justify-content-center is-align-items-center is-column-gap-2">
    <span class="tag is-info is-light">interval(2000)</span>
    <code class="title is-2">{{ counter() }}</code>
  </div>`,
  styles: ``,
})
export class SubscriptionControlIntervalComponent implements OnDestroy {
  subscription?: Subscription;
  every2SecondsCounter$ = interval(2000);
  counter = signal(0);

  constructor() {
    this.subscription = this.every2SecondsCounter$.subscribe((value) => {
      console.log(value);
      this.counter.set(value);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
