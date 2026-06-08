import { Component, signal } from '@angular/core';
import { interval, map } from 'rxjs';
import { PageComponent } from '../../common/page/page.component';

@Component({
  selector: 'app-one-source-many-subscribers-behavior',
  imports: [PageComponent],
  template: `<app-page
    pageTitle="Zimny czy gorący? (cold observable)"
    pageDescription="Ten sam strumień źródłowy (interval), ale dwóch subskrybentów. Kliknij „Startuj #1” — licznik rusza. Potem kliknij „Startuj #2” — okaże się, że mimo wspólnego źródła drugi licznik też startuje od 0-1-2. To potwierdza zimne (cold) zachowanie: każda subskrypcja dostaje własną, niezależną produkcję wartości."
    fileMatch="b-rxjs/b04-am-i-hot-or-not/one-source-many-subscribers-behavior.page"
  >
    <div class="columns">
      <div class="column">
        <div class="card">
          <div class="card-content has-text-centered">
            <p class="heading">Licznik #1</p>
            <p class="title is-1">{{ counterOne() }}</p>
          </div>
          <footer class="card-footer">
            <button
              class="button is-primary card-footer-item is-radiusless"
              (click)="startReceiveValuesForFirstCounter()"
            >
              Startuj #1
            </button>
          </footer>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <div class="card-content has-text-centered">
            <p class="heading">Licznik #2</p>
            <p class="title is-1">{{ counterTwo() }}</p>
          </div>
          <footer class="card-footer">
            <button
              class="button is-link card-footer-item is-radiusless"
              (click)="startReceiveValuesForSecondCounter()"
            >
              Startuj #2
            </button>
          </footer>
        </div>
      </div>
    </div>
  </app-page>`,
  styles: ``,
})
export class OneSourceManySubscribersBehaviorPage {
  counterOne = signal(0);
  counterTwo = signal(0);

  // 📃 Doc: https://rxjs.dev/guide/glossary-and-semantics
  secondsSource$ = interval(1000).pipe(map((i) => i + 1));

  startReceiveValuesForFirstCounter() {
    this.secondsSource$.subscribe((value) => this.counterOne.set(value));
  }

  startReceiveValuesForSecondCounter() {
    this.secondsSource$.subscribe((value) => this.counterTwo.set(value));
  }
}
