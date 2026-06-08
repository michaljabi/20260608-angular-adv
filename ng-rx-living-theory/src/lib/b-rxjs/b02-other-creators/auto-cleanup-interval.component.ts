import { Component } from '@angular/core';
import { interval, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-auto-cleanup-interval',
  imports: [AsyncPipe],
  template: `
    <div class="is-flex is-justify-content-center is-align-items-center is-column-gap-2">
      <span class="tag is-info is-light">interval(1000)</span>
      <code class="title is-2">{{ everySecondCounter$ | async }}</code>
    </div>`,
  styles: ``,
})
export class AutoCleanupIntervalComponent {
  everySecondCounter$ = interval(1000).pipe(startWith(0));
}
