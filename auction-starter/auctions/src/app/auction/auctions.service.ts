import { Injectable } from '@angular/core';
import { AuctionItem } from './auction-item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuctionsService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<AuctionItem[]> {
    return this.httpClient.get<AuctionItem[]>('api/auctions')
  }

  addNew(idLessItem: Omit<AuctionItem, 'uid'>) {
    return this.httpClient.post<AuctionItem>('api/auctions', idLessItem);
  }
}
