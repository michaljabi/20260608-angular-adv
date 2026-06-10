import { inject, Injectable } from '@angular/core';
import { AuctionItem } from './auction-item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// To jest stateless service - nie trzyma żadnego stanu
// Jego zadaniem jest odczyt stanu z Back-end
@Injectable({ providedIn: 'root' })
export class AuctionsService {

  // constructor(private httpClient: HttpClient) { }
  httpClient = inject(HttpClient);

  // PROVIDER:
  getAll(): Observable<AuctionItem[]> {
    return this.httpClient.get<AuctionItem[]>('api/auctions')
  }

  // PROVIDER:
  addNew(idLessItem: Omit<AuctionItem, 'uid'>) {
    return this.httpClient.post<AuctionItem>('api/auctions', idLessItem);
  }
}

// ⚔️ Sidequest:
// 🪲 Spot the bug
const auctionService = new AuctionsService();
// To nie zadziała - nie wyśle aukcji na back-end
auctionService.addNew({ title: 'Hello' } as AuctionItem)
// Pytanie - dlaczego?
// Odpowiedź: ponieważ domyślnie Observables - są "lazy"
// Jeśli nie mam `subskrybenta` - nie emituje! | zachowanie COLD.


// TODO: wyjaśnij COLD / HOT - dokładniej
