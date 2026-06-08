import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Advice, AdviceSummary } from './advice-item';

@Service()
export class AdvicesService {
  private httpClient = inject(HttpClient);

  getAll(): Observable<AdviceSummary[]> {
    return this.httpClient.get<AdviceSummary[]>('api/advices');
  }

  getOne(uid: string): Observable<Advice> {
    return this.httpClient.get<Advice>(`api/advices/${uid}`);
  }
}
