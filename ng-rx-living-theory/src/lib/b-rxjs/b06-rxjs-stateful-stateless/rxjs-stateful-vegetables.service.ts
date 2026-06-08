import { Service } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';


// nowy dekorator w Angular 22 (zastępuje @Injectable({providedIn: 'root'}) - robi dokładnie to samo!)
// więc to "lukier składniowy"
@Service()
export class RxjsStatefulVegetablesService {
  // specjalny Subject, który potrafi jednocześnie odbierać i wysyłać dane:
  private vegetablesSubject = new BehaviorSubject(['lettuce', 'tomato', 'cucumber']);

  // [SELEKTOR] odcinamy mu możliwość emisji (.next()) aby bezpiecznie go zwrócić w getAll()
  vegetable$ = this.vegetablesSubject.asObservable();
  // [SELEKTOR] projektujemy zachowanie liczenia:
  numberOfVegetable$ = this.vegetablesSubject.pipe(map((vegetables) => vegetables.length));

  // [AKCJA] metoda do dodawania elementu do naszej listy warzyw:
  add(veggie: string): void {
    // Odczytaj statycznie z Subject aktualną wartość:
    const vegetables: string[] = this.vegetablesSubject.getValue();
    // Dopisz do niej nowe warzywo:
    vegetables.push(veggie);
    // Rozgłoś wszystkim zainteresowanym — zmiany
    this.vegetablesSubject.next(vegetables);
  }

  // [AKCJA] wyprowadzamy metodę do usunięcia wszystkich warzyw:
  removeAll(): void {
    this.vegetablesSubject.next([]);
  }
}
