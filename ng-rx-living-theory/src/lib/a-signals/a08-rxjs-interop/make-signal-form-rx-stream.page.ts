import { Component } from '@angular/core';
import { PageComponent } from '../../common/page/page.component';

import { ToSignalForCombinedStreamsComponent } from './to-signal-for-combined-streams.component';
import { ToSignalBasicComponent } from './to-signal-basic.component';
import { ToObservableFromSignalComponent } from './to-observable-from-signal.component';

@Component({
  selector: 'app-make-signal-form-rx-stream',
  imports: [
    PageComponent,
    ToSignalForCombinedStreamsComponent,
    ToSignalBasicComponent,
    ToObservableFromSignalComponent,
  ],
  template: `<app-page
    pageTitle="Sygnał na podstawie strumienia RxJS"
    pageDescription="toSignal() przerzuca most między światem RxJS a sygnałami — zamienia Observable na sygnał, który auto-subskrybuje i auto-czyści się wraz z komponentem. Tutaj strumień startuje dopiero po kliknięciu „Startuj”: interval co 1 sekundę emituje 6 wartości (take(6)), a szablon czyta je jak zwykły sygnał, bez pipe'a async."
    fileMatch="a-signals/a08-rxjs-interop/make-signal-form-rx-stream.page"
  >
    <h2 class="is-2">Przykład prosty <code>#1</code></h2>
    <app-to-signal-basic />
    <h2 class="is-2">Przykład <code>#2</code></h2>
    <app-to-signal-for-combined-streams />
    <h2 class="is-2">Przykład w 2 stronę: Observable z Signal <code>#3</code></h2>
    <app-to-observable-from-signal />
  </app-page>`,
  styles: ``,
})
export class MakeSignalFormRxStreamPage {}