import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PageComponent } from '../../common/page/page.component';

@Component({
  selector: 'app-hold-the-state-with-behaviour-subject',
  imports: [AsyncPipe, PageComponent],
  template: `<app-page
    pageTitle="Jak trzymać stan? (BehaviorSubject)"
    pageDescription="BehaviorSubject to strumień, który pamięta swoją bieżącą wartość (tutaj start od 1) i od razu oddaje ją nowym subskrybentom. Pozwala też edytować stan „z zewnątrz” za pomocą next()/getValue(). Kliknij „Startuj” — interval co 1 sekundę zwiększa licznik, co pokazuje strumień jako nośnik (przechowalnię) stanu."
    fileMatch="b-rxjs/b05-how-to-hold-the-state/hold-the-state-with-behaviour-subject.page"
  >
    <div class="card">
      <div class="card-content has-text-centered">
        <p class="heading">Licznik</p>
        <p class="title is-1">{{ myNumber$ | async }}</p>
      </div>
      <footer class="card-footer">
        <button
          class="button is-primary card-footer-item is-radiusless"
          (click)="handleStartCounter()"
        >
          Startuj
        </button>
      </footer>
    </div>
  </app-page>`,
  styles: ``,
})
export class HoldTheStateWithBehaviourSubjectPage implements OnDestroy {
  // zauważ różnicę w początkowy zachowaniu
  // 📃 Doc: https://rxjs.dev/api/index/class/BehaviorSubject
  myNumber$ = new BehaviorSubject(1);
  intervalRef?: ReturnType<typeof setInterval>;

  // logika oparta na imperatywnym dodawaniu,
  // ale udowadnia nam, że możemy edytować stan "z zewnątrz"
  addOne() {
    this.myNumber$.next(this.myNumber$.getValue() + 1);
  }

  handleStartCounter() {
    this.intervalRef = setInterval(() => this.addOne(), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalRef);
  }
}
