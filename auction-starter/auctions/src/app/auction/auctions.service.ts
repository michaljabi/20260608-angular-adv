import { inject, Injectable } from '@angular/core';
import { AuctionItem } from './auction-item';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// To jest stateless service - nie trzyma żadnego stanu
// Jego zadaniem jest odczyt stanu z Back-end
@Injectable({ providedIn: 'root' })
export class AuctionsService {
  // constructor(private httpClient: HttpClient) { }
  httpClient = inject(HttpClient);

  // PROVIDER:
  getAll(): Observable<AuctionItem[]> {
    return this.httpClient.get<AuctionItem[]>('api/auctions').pipe(
      tap((auctionItems) => {
        // ❌ Anti-pattern: 🪲🪲🪲🪲
        // Mutowanie wartości na strumieniu - łamię regułę "READ ONLY"
        // auctionItems[0].title = 'TROLL'; // odkomentu żeby zobaczyć BUGa

        // jeśli koniecznie chemy zmodyfikować to
        // const auctionItemCopy = {...auctionItems[0]}; // shallow copy
        
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone
        const auctionItemCopy = structuredClone(auctionItems[0]); // deep copy (UWAGA działa dla JSON-like)
        auctionItemCopy.title = 'Test';
        console.log(auctionItemCopy);

        // Jeśli tap() używamy tylko do "efektów ubocznych" np. tutaj logowanie na console
        // to wszystko jest ok.
        // pamiętaj: Tylko do oczytu
        console.log('Dostaję aukcje', auctionItems);
        // to jest ok (choć nic nie robi, jest niepotrzebne, ale też nie popsuje strumienia)
        return [];
      }),
    );
  }

  // PROVIDER:
  addNew(idLessItem: Omit<AuctionItem, 'uid'>) {
    return this.httpClient.post<AuctionItem>('api/auctions', idLessItem).pipe(
      // podtawowy operator do DEBUG RxJs
      // REGUŁA NADRZĘDNA RxJS - "Trakuj dane ze strumienia ZAWSZE tylko to doczytu"
      tap((auction: AuctionItem) => {
        auction.title = 'TROLL';
      }),
    );
  }
}

// ⚔️ Sidequest:
// 🪲 Spot the bug
// const auctionService = new AuctionsService();

// To nie zadziała - nie wyśle aukcji na back-end
// auctionService.addNew({ title: 'Hello' } as AuctionItem);

// Pytanie - dlaczego?
// Odpowiedź: ponieważ domyślnie Observables - są "lazy"
// Jeśli nie mam `subskrybenta` - nie emituje! | zachowanie COLD.

// TODO: wyjaśnij COLD / HOT - dokładniej
