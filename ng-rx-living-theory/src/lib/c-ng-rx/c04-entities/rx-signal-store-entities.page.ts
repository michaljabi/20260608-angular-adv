import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { PageComponent } from '../../common/page/page.component';
import { PartyStore } from './party.store';
import { InvitationStatus } from './attendant';

@Component({
  selector: 'app-rx-signal-store-entities',
  imports: [PageComponent, JsonPipe],
  providers: [PartyStore],
  template: `
    <app-page
      pageTitle="Signal Store z withEntities"
      pageDescription="Zarządzanie listą gości z withEntities, withComputed i integracją z httpResource"
      fileMatch="c-ng-rx/c04-entities/rx-signal-store-entities.page.ts"
    >
      <div class="columns">
        <div class="column">
          <nav class="panel is-info">
            <p class="panel-heading">
              Dostępni goście ({{ store.availableUsers().length }})
              <button
                class="button is-small is-info ml-2"
                [class.is-loading]="store.isLoading()"
                (click)="store.reloadUsers()"
              >
                Przeładuj
              </button>
            </p>

            @if (store.isLoading()) {
              <div class="panel-block">
                <button class="button is-loading is-fullwidth">Ładowanie…</button>
              </div>
            } @else if (store.error(); as err) {
              <div class="panel-block">
                <div class="notification is-danger">
                  <pre><code>{{ err | json }}</code></pre>
                </div>
              </div>
            } @else {
              @for (user of store.availableUsers(); track user.id) {
                <a class="panel-block">
                  <span class="panel-icon">
                    <i class="fas fa-user" aria-hidden="true"></i>
                  </span>
                  <span style="flex: 1;">{{ user.name }}</span>
                  <button class="button is-small is-primary" (click)="store.inviteGuest(user)">
                    Zaproś
                  </button>
                </a>
              } @empty {
                <div class="panel-block has-text-grey">
                  Wszyscy goście zostali zaproszeni.
                </div>
              }
            }
          </nav>
        </div>

        <div class="column">
          <nav class="panel is-success">
            <p class="panel-heading">
              Zaproszeni goście ({{ store.entities().length }})
            </p>

            @for (guest of store.entities(); track guest.id) {
              <a class="panel-block">
                <span class="panel-icon">
                  <i class="fas fa-user-check" aria-hidden="true"></i>
                </span>
                <span style="flex: 1;">{{ guest.name }}</span>
                <select
                  class="select is-small"
                  [value]="guest.status"
                  (change)="onStatusChange(guest.id, $event)"
                >
                  <option value="awaiting">Oczekuje</option>
                  <option value="invited">Zaproszony</option>
                  <option value="confirmed">Potwierdzony</option>
                  <option value="declined">Odrzucił</option>
                </select>
                <button
                  class="delete ml-2"
                  type="button"
                  aria-label="remove"
                  (click)="store.removeGuest(guest.id)"
                ></button>
              </a>
            } @empty {
              <div class="panel-block has-text-grey">
                Brak zaproszonych gości. Zaproś kogoś z listy obok.
              </div>
            }
          </nav>
        </div>
      </div>
    </app-page>
  `,
})
export class RxSignalStoreEntitiesPage {
  readonly store = inject(PartyStore);

  onStatusChange(id: number, event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.store.updateStatus(id, select.value as InvitationStatus);
  }
}
