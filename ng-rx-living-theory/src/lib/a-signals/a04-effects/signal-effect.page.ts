import { Component } from '@angular/core';
import { PageComponent } from '../../common/page/page.component';
import { SimpleUsageOfEffectComponent } from './simple-usage-of-effect.component';
import { PersistFormWithEffectComponent } from './persist-form-with-effect.component';
import { EffectOutsideInjectionContextComponent } from './effect-outside-injection-context.component';
// import { EffectInfiniteLoopComponent } from './effect-infinite-loop.component';
import { EffectMissingCleanupComponent } from './effect-missing-cleanup.component';

@Component({
  selector: 'app-signal-effect',
  imports: [
    PageComponent,
    SimpleUsageOfEffectComponent,
    PersistFormWithEffectComponent,
    EffectOutsideInjectionContextComponent,
    //EffectInfiniteLoopComponent,
    EffectMissingCleanupComponent,
  ],
  template: `<app-page
    pageTitle="Efekty"
    pageDescription="effect() uruchamia efekt uboczny przy każdej zmianie sygnałów, które odczytuje. Tu reagujemy na count() i ustawiamy komunikat po przekroczeniu progów."
    fileMatch="a-signals/a04-effects/signal-effect.page"
  >
    <h3 class="is-4">Przykład #1: effect() zamiast computed() (antywzorzec)</h3>
    <blockquote>Przykład pozwala zapoznać się z <code>API</code> do <code>effect()</code></blockquote>
    <app-simple-usage-of-effect />

    <h3 class="is-4">Przykład #2: zapis do localStorage (uzasadniony effect())</h3>
    <app-persist-form-with-effect />
    
    <hr/>

    <blockquote> Poniżej przykłady "Common Pitfalls" - niewłaściwego użycia <code>effect()</code></blockquote>

    <h3 class="is-4">Przykład #3: effect() poza injection context (NG0203)</h3>
    <blockquote><code>[Runtime BUG]</code> — <code>effect()</code> wywołany w handlerze rzuca <code>NG0203</code> po kliknięciu (zobacz konsolę).</blockquote>
    <app-effect-outside-injection-context />

    <h3 class="is-4">Przykład #4: pętla nieskończona — odczyt i zapis tego samego sygnału</h3>
    <blockquote><code>[Runtime BUG]</code> — komponent rzuca wyjątek przy montowaniu. Odkomentuj poniżej (import, <code>imports: []</code> oraz tag), aby zobaczyć błąd pętli nieskończonej.</blockquote>
    <!-- <app-effect-infinite-loop /> -->

    <h3 class="is-4">Przykład #5: brak onCleanup (wyciek interwału)</h3>
    <blockquote><code>[Silent BUG]</code> — każdy re-run dokłada nowy <code>setInterval</code>; bez <code>onCleanup</code></blockquote>
    <app-effect-missing-cleanup />
  </app-page>`,
  styles: ``,
})
export class SignalEffectPage {}