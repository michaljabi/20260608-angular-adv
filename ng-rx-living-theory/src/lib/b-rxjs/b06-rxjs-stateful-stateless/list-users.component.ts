import { Component, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { UserStatelessService } from './user-stateless.service';
import { AsyncPipe } from '@angular/common';
import { ListSearchControlComponent } from './list-search-control.component';
import { mergeMap, startWith, Subject } from 'rxjs';

@Component({
  selector: 'app-list-users',
  imports: [NgIcon, AsyncPipe, ListSearchControlComponent],
  template: `<blockquote>
      W Stateless <code>UserStatelessService</code> nie przechowujemy żadnego stanu, jego zadanie to
      jedynie pobranie listy użytkowników + ew. filtrowanie ich przez <code>name</code>. Jedyna
      odpowiedzialność to używanie <code>Observables</code> przy zapytaniu <code>ajax</code> do
      endpointu REST
    </blockquote>
    <div class="panel is-info">
      <p class="panel-heading">
        <ng-icon name="users" /> Użytkownicy ({{ (users$ | async)?.length }})
      </p>
      <app-list-search-control (search)="filterUsers($event)" />
      @for (user of users$ | async; track user.id) {
        <a class="panel-block">
          <span class="panel-icon">
            <ng-icon name="user" />
          </span>
          <span>
            {{ user.name }}
            <span class="has-text-grey is-size-7 ml-2">{{ user.email }}</span>
          </span>
        </a>
      }
    </div> `,
  styles: ``,
})
export class ListUsersComponent {
  usersStateless = inject(UserStatelessService);
  private readonly filterText = new Subject<string>();

  // ⚔️ Sidequest: z subskrypcjami tego 'COLD' stream są problemy (2 problemy) - jak je rozwiązać?
  // 1. zidentyfikuj, jakie to problemy
  // 2. zaproponuj rozwiązanie; wyjaśnij.
  protected readonly users$ = this.filterText.pipe(
    startWith(''), // ⚔️ Dodatkowo: znaczenie tego startWith('') jest następujące: zauważ, że bez niego nie zobaczymy user'ów na początku; czemu?
    mergeMap((text) => this.usersStateless.getUsers(text)),
  );

  filterUsers(text: string) {
    this.filterText.next(text);
  }
}
