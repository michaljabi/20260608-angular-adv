import { Component } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { PageComponent } from '../../common/page/page.component';
import { User } from './user';
import { NgIcon } from '@ng-icons/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-users-http-resource',
  imports: [PageComponent, NgIcon, JsonPipe],
  template: `<app-page
    pageTitle="httpResource"
    pageDescription="httpResource() to sygnałowy zasób HTTP. Sam wykonuje żądanie i wystawia stan jako sygnały: value() (dane), isLoading() (w toku), error() (błąd). Nie trzeba subskrybować ani sprzątać."
    fileMatch="a-signals/a07-http-resource/users-http-resource.page"
  >
    <div class="mb-4">
      <button
        class="button is-link is-light"
        [class.is-loading]="usersResource.isLoading()"
        (click)="usersResource.reload()"
      >
        Przeładuj
      </button>
    </div>

    @if (usersResource.isLoading()) {
      <button class="button is-loading is-fullwidth">Ładowanie użytkowników…</button>
    } @else if (usersResource.error()) {
      <div class="notification is-danger">
        Nie udało się pobrać użytkowników.
        <pre><code>{{ usersResource.error() | json  }}</code></pre>
      </div>
    } @else {
      <nav class="panel is-success">
        <p class="panel-heading">
          <ng-icon name="users" /> Użytkownicy ({{ usersResource.value().length }})
        </p>
        @for (user of usersResource.value(); track user.id) {
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
      </nav>
    }
    <blockquote>
      Sprawdź działanie <code>httpResource</code> i dostarczonych sygnałów
      <code>.isLoading()</code>.
    </blockquote>
  </app-page>`,
  styles: ``,
})
export class UsersHttpResourcePage {
  // 📃 Doc: https://angular.dev/guide/http/http-resource#using-httpresource
  protected readonly usersResource = httpResource<User[]>(
    () => 'https://jsonplaceholder.typicode.com/users',
    // ⚔️ Sidequest: potem przestaw kod "nasz" endpoint
    // Sprawdź jego działanie w `src/fake-data`
    // () => '/api/users',
    { defaultValue: [] },
  );

  // ❌ Anti-pattern: to pokazuje nam API do httpResource jednak bezpośrednio w Component!
  // httpResource powinno być zasłonięte, warstwą serwisową!
  // Porównaj z poprawnym: /src/lib/c-ng-rx/c04-entities/users.resource.ts
}
