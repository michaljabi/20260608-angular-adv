import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../a-signals/a07-http-resource/user';

@Service()
export class UserStatelessService {
  readonly #http = inject(HttpClient);

  getUsers(name?: string): Observable<User[]> {
    return this.#http.get<User[]>(`/api/users`, {
      params: {
        ...(name ? { name } : {})
      }
    });
  }
}
