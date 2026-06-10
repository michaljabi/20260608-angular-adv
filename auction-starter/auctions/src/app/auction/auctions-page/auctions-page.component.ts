import { Component, inject, OnInit, signal } from '@angular/core';
import { AuctionsService } from '../auctions.service';
import { AuctionItem } from '../auction-item';
import { AuctionCardComponent } from '../auction-card/auction-card.component';
import { SharedModule } from '../../shared/shared.module';
//import { CartStore } from '../../cart/cart.store';
import { CartNgrxStore } from '../../cart/cart.ngrx-store';

@Component({
  imports: [AuctionCardComponent, SharedModule],
  template: `
    <h2 class="my-3">Lista naszych aukcji {{ isLoading() }}</h2>

    <div class="row">
      <div class="col-12">
        <app-search-bar (search)="searchText.set($event)" />
        {{ searchText() }}
      </div>
      @for (item of filteredAuctions; track item.uid) {
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <app-auction-card
            [isPromoted]="$index === 1"
            [auction]="item"
            (addToCart)="handleAddToCart($event)"
          />
        </div>
      } @empty {
        @if (isLoading()) {
          <div class="col-12">
            <div class="alert alert-info">Poczekaj... ładuję aukcje...</div>
          </div>
        }
        @if (errorMessage()) {
          <div class="col-12">
            <div class="alert alert-danger">
              Nie udało się załadować aukcji 😭 !
              <hr />
              <div>{{ errorMessage() }}</div>
            </div>
          </div>
        }
      }
    </div>
  `,
})
export class AuctionsPageComponent implements OnInit {
  protected isLoading = signal(true);
  protected errorMessage = signal('');
  protected auctions = signal<AuctionItem[]>([]); // to powinien być sygnał
  protected searchText = signal('');

  private auctionService = inject(AuctionsService);
  private readonly cartStore = inject(CartNgrxStore);

  ngOnInit(): void {
    this.loadAuctions();
  }

  get filteredAuctions(): AuctionItem[] {
    return this.auctions().filter((a) =>
      a.title.toLowerCase().includes(this.searchText().toLowerCase()),
    );
  }

  loadAuctions() {
    this.isLoading.set(true);
    this.auctions.set([]);
    this.errorMessage.set('');

    // CONSUMER:
    // #1 --- wiemy, że COLD
    // #2 --- wiemy, że SKOŃCZONY
    // czy strumień jest skończony czy nieskończony?

    // Zasady RxJS: kontrakt
    // 1. jeśli strumień emituje to `next`
    // 2. jeśli skończył to `complete`
    // 3. jeśli ma error to `error`
    // NIE MOGĄ ISTNIEĆ 2 STANY w tym samym momencie
    // stany `complete` / `error` - powodują, 
    // że nie wracamy do `next` ani żadnego innego przeciwnego stanu
    this.auctionService.getAll().subscribe({
      next: (auctions) => {
        this.auctions.set(auctions);
        console.log(auctions);
        // this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Nieznany błąd');
        // this.isLoading.set(false);
      },
      complete: () => {
        // ⚔️ Sidequest:
        // 🪲 spot the bug, czemu nie TYLKO tak:
        this.isLoading.set(false);
      },
    });
  }

  handleAddToCart(auction: AuctionItem) {
    this.cartStore.addAuction(auction);
  }
}
