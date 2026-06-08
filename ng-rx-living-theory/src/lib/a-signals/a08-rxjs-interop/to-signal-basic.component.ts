import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-to-signal-basic',
  imports: [],
  template: ` <div class="card">
    <div class="card-content has-text-centered">
      <p class="heading">Basic (numbers()) - toSignal</p>
      <p class="title is-1">{{ numbers() }}</p>
    </div>
  </div>`,
  styles: ``,
})
export class ToSignalBasicComponent {
  private readonly number$ = interval(1000);

  // 📃 Doc: https://angular.dev/ecosystem/rxjs-interop#create-a-signal-from-an-rxjs-observable-with-tosignal
  protected readonly numbers = toSignal(this.number$);
}
