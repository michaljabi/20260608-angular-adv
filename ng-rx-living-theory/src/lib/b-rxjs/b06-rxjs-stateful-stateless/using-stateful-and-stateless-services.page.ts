import { Component } from '@angular/core';
import { PageComponent } from '../../common/page/page.component';
import { FormsModule } from '@angular/forms';
import { ListVegetablesComponent } from './list-vegetables.component';
import { ListUsersComponent } from './list-users.component';

@Component({
  selector: 'app-using-stateful-and-stateless-services',
  imports: [PageComponent, FormsModule, ListVegetablesComponent, ListUsersComponent],
  template: `<app-page
    pageTitle="Stan w RxJS: serwisy stateful i stateless"
    pageDescription="W tej sekcji porównujemy dwa podejścia do trzymania stanu w RxJS: stateful (np. BehaviorSubject) i stateless (np. interval). Zobaczysz, jak oba rozwiązania radzą sobie z tym samym zadaniem, ale różnią się w sposobie zarządzania stanem i jego aktualizacji."
    fileMatch="b-rxjs/b06-rxjs-stateful-stateless/using-stateful-and-stateless-services.page"
  >
    <h3 class="is-4">Przykład #1: Użycie <code>Stateful Service</code></h3>
    <app-list-vegetables />

    <h3 class="is-4">Przykład #2: Użycie <code>Stateless Service</code></h3>
    <app-list-users />
  </app-page>`,
  styles: ``,
})
export class UsingStatefulAndStatelessServicesPage {}
