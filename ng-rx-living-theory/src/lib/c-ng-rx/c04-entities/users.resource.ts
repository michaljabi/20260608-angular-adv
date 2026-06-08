import { Service } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { User } from '../../a-signals/a07-http-resource/user';

@Service()
export class UsersResource {
  readonly #resource = httpResource<User[]>(() => '/api/users', { defaultValue: [] });

  get value() {
    return this.#resource.value;
  }
  get isLoading() {
    return this.#resource.isLoading;
  }
  get error() {
    return this.#resource.error;
  }

  reload(): void {
    this.#resource.reload();
  }
}
