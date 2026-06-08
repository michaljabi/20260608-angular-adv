import { computed, effect, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { addEntity, removeEntity, updateEntity, withEntities } from '@ngrx/signals/entities';
import { User } from '../../a-signals/a07-http-resource/user';
import { Attendant } from './attendant';
import { UsersResource } from './users.resource';
// --- Interop z RxJS:
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { UserStatelessService } from '../../b-rxjs/b06-rxjs-stateful-stateless/user-stateless.service';

type PartyState = {
  partyName: string;
  users: User[];
  isLoading: boolean;
  error: unknown;
};

const initialState: PartyState = {
  partyName: 'Imprezka u Tomka',
  users: [],
  isLoading: false,
  error: undefined,
};

export const PartyStore = signalStore(
  // 📃 Doc: https://ngrx.io/guide/signals/signal-store#providing-and-injecting-the-store
  // {providedIn: 'root'},
  withState(initialState),
  // 📃 Doc: https://ngrx.io/guide/signals/signal-store/entity-management
  withEntities<Attendant>(),
  withComputed((store) => ({
    availableUsers: computed(() => store.users().filter((u) => !new Set(store.ids()).has(u.id))),
  })),
  withMethods((store) => {
    const usersResource = inject(UsersResource);
    const userStatelessService = inject(UserStatelessService);

    return {
      inviteGuest(user: User): void {
        const attendant: Attendant = {
          id: user.id,
          name: user.name,
          email: user.email,
          status: 'awaiting',
        };
        patchState(store, addEntity(attendant));
      },
      updateStatus(id: number, status: Attendant['status']): void {
        patchState(store, updateEntity({ id, changes: { status } }));
      },
      removeGuest(id: number): void {
        patchState(store, removeEntity(id));
      },
      reloadUsers: () => usersResource.reload(),
      // RxJS interop:
      reloadUsersWithRxService: rxMethod<string | undefined>(
        pipe(
          switchMap((name) => {
            patchState(store, { isLoading: true, error: undefined });
            return userStatelessService.getUsers(name).pipe(
              // efekt uboczny na strumieniu RxJS
              // aktualizujemy stan naszego store:
              tap({
                next: (users) => patchState(store, { users, isLoading: false }),
                error: (err) => patchState(store, { error: err, isLoading: false }),
              }),
            );
          }),
        ),
      ),
    };
  }),
  withHooks({
    onInit(store) {
      const resource = inject(UsersResource);
      effect(() => {
        patchState(store, {
          users: resource.value(),
          isLoading: resource.isLoading(),
          error: resource.error(),
        });
      });
    },
  }),
);
