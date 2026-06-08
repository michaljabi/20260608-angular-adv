import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { AuctionsService } from '../auctions.service';
import { AuctionItem } from '../auction-item';

@Component({
  imports: [SharedModule, FormsModule, JsonPipe],
  template: `
    <h2 class="my-3">Dodaj nową aukcję</h2>
    <section class="row">
      <div class="col-6">
        <img class="img-thumbnail" alt="Podgląd fotografii" [src]="imgPreviewUrl" />
      </div>
      <div class="col-6">
        <form #auctionForm="ngForm" (ngSubmit)="handleSubmit(auctionForm)">
          <div class="form-group">
            <label for="auctionTitle">Nazwa aukcji</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <fa-icon icon="edit"></fa-icon>
                </span>
              </div>
              <input
                id="auctionTitle"
                type="text"
                name="title"
                required
                class="form-control"
                ngModel
                #title="ngModel"
              />
            </div>
            @if (title.errors && title.touched) {
              <div class="alert alert-danger">To pole jest wymagane</div>
            }
          </div>

          <div class="form-group">
            <label for="auctionPrice">Cena aukcji</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <fa-icon icon="tag"></fa-icon>
                </span>
              </div>
              <input
                id="auctionPrice"
                type="number"
                name="price"
                required
                class="form-control"
                ngModel
              />
            </div>
          </div>

          <div class="form-group">
            <label for="img">Zdjecie</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <fa-icon icon="image"></fa-icon>
                </span>
              </div>
              <input
                id="img"
                type="number"
                name="imgId"
                required
                class="form-control"
                [(ngModel)]="imgId"
                min="1"
                max="1080"
                #imgIdRef="ngModel"
              />
            </div>
            @if (imgIdRef.errors && imgIdRef.touched) {
              <div class="alert alert-danger">
                {{ imgIdRef.errors | json }}
              </div>
            }
          </div>

          <div class="form-group">
            <label for="auctionDescription">Szczegółowy opis</label>
            <div class="input-group mb-3">
              <textarea
                id="auctionDescription"
                rows="5"
                class="form-control"
                name="description"
                ngModel
              ></textarea>
            </div>
          </div>
          <div class="text-right">
            <button class="btn btn-primary" type="submit">
              <fa-icon icon="gavel"></fa-icon> Dodaj aukcję
            </button>
          </div>
        </form>
      </div>
    </section>
  `,
  styles: [
    `
      textarea.ng-invalid.ng-touched,
      input.ng-invalid.ng-touched {
        border-color: darkred;
      }
    `,
  ],
})
export class AddAuctionPageComponent {
  /**
   * Zadanie #6: Przepraw formularz, aby używał SignalForms.
   */

  imgId = 1;
  auctionsService = inject(AuctionsService);

  get imgPreviewUrl(): string {
    if (this.imgId < 0) {
      return `https://picsum.photos/id/1/600/600`;
    }
    return `https://picsum.photos/id/${this.imgId}/600/600`;
  }

  handleSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    console.log('WYSYŁAM!', form.value);

    const { title, description, price } = form.value;
    const auction: Omit<AuctionItem, 'uid'> = {
      title,
      price,
      description,
      imgUrl: this.imgPreviewUrl,
    };
    this.auctionsService.addNew(auction);
    this.auctionsService.addNew(auction).subscribe({
      next: (a: AuctionItem) => {
        form.resetForm();
        this.imgId = 1;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
