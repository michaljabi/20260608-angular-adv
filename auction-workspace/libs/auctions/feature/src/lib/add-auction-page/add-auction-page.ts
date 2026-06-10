import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuctionsResourceService } from '@auction-workspace/auctions/data-access';
import { AddAuctionWizard } from '@auction-workspace/auctions/ui';
import { AuctionItemWithoutUid } from '@auction-workspace/shared/domain';

/**
 * Ta strona jest komponentem SMART.
 *
 * Wie, skąd pozyskać dane -> nasłuchuje zwrotki eventu (completed) z wizzarda.
 * Wie, dokąd dane wysłać -> woła `AuctionsResourceService.addOne()`, a po dodaniu, przekierowuje routerem.
 *
 * auctions-feature -> auctions-data-access -> auctions-api -> auctions-db
 * może korzystać ze swojego ui, shared elementów, swojego data-access, innych api
 */
@Component({
  selector: 'lib-add-auction-page',
  imports: [AddAuctionWizard],
  template: `
    <section>
      <h2>Dodaj nową aukcję</h2>
      @if (error()) {
        <div class="alert alert-danger">Nie udało się dodać aukcji.</div>
      }
      <lib-add-auction-wizard (completed)="onCompleted($event)" />
    </section>
  `,
  styles: ``,
})
export class AddAuctionPage {
  private readonly auctionsResource = inject(AuctionsResourceService);
  private readonly router = inject(Router);

  protected readonly error = signal(false);

  protected onCompleted(draft: AuctionItemWithoutUid): void {
    this.error.set(false);
    this.auctionsResource.addOne(draft).subscribe({
      next: () => this.router.navigate(['/auctions']),
      error: () => this.error.set(true),
    });
  }
}
