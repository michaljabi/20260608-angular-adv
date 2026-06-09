import { Component, computed, inject, signal } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
// import { FormsModule } from '@angular/forms';
import { AuctionsService } from '../auctions.service';
import { AuctionItem } from '../auction-item';
import {
  form,
  FormField,
  // max,
  // min,
  // required,
  FormRoot,
  validateStandardSchema,
} from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { AuctionModelSchema, AuctionFormModel } from './auction-model.schema';

// Albo tak tzw. Index Type z TS
// https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html#handbook-content
/*
  interface AuctionFormModel {
    title: AuctionItem['title'];
    price: AuctionItem['price'];
    imgId: number;
    description: string;
  }
*/

// Albo tak tzw Util Type (Pick<>) użyty
// https://www.typescriptlang.org/docs/handbook/utility-types.html#handbook-content
// https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys
type AuctionFormModelVariant = Pick<AuctionItem, 'title' | 'price'> & {
  imgId: number;
  description: string;
};

@Component({
  selector: 'app-add-auction-page-signal',
  imports: [SharedModule /*FormsModule,*/, FormRoot, FormField, JsonPipe],
  template: `
    <h2 class="my-3">Dodaj nową aukcję</h2>
    <section class="row">
      <div class="col-6">
        <img class="img-thumbnail" alt="Podgląd fotografii" [src]="imgPreviewUrl()" />
      </div>
      <div class="col-6">
        <form [formRoot]="auctionForm" (submit)="handleSubmit()">
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
                [formField]="auctionForm.title"
                [class.invalid]="auctionForm.title().invalid() && auctionForm.title().touched()"
                class="form-control"
              />
            </div>
            @if (auctionForm.title().invalid() && auctionForm.title().touched()) {
              @for (error of auctionForm.title().errors(); track error.kind) {
                <div class="alert alert-danger">{{ error.message }}</div>
              }
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
                class="form-control"
                [formField]="auctionForm.price"
                [class.invalid]="auctionForm.price().invalid() && auctionForm.price().touched()"
              />
            </div>
            @if (auctionForm.price().invalid() && auctionForm.price().touched()) {
              @for (error of auctionForm.price().errors(); track error.kind) {
                <div class="alert alert-danger">{{ error | json }}</div>
              }
            }
          </div>

          <div class="form-group">
            <label for="img">Zdjecie</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <fa-icon icon="image"></fa-icon>
                </span>
              </div>
              <input id="img" type="number" class="form-control" [formField]="auctionForm.imgId" />
            </div>
            @if (auctionForm.imgId().invalid() && auctionForm.imgId().touched()) {
              <div class="alert alert-danger">
                {{ auctionForm.imgId().errors() | json }}
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
                [formField]="auctionForm.description"
              ></textarea>
            </div>
          </div>
          <div class="text-right">
            <button
              class="btn btn-primary"
              type="submit"
              [style]="{ opacity: auctionForm().invalid() ? 0.6 : 1 }"
            >
              <fa-icon icon="gavel"></fa-icon> Dodaj aukcję
            </button>
          </div>
        </form>
      </div>
    </section>
  `,
  styles: [
    `
      textarea.invalid,
      input.invalid {
        border-color: darkred;
      }
    `,
  ],
})
export class AddAuctionPageSignalComponent {
  auctionModel = signal<AuctionFormModel>({
    title: '',
    price: 0,
    imgId: 1,
    description: '',
  });

  auctionForm = form(this.auctionModel, (schema) => {
    /*
    const genericReq = { message: 'To pole jest wymagane' };
    required(schema.title, genericReq);
    required(schema.price, { message: 'Musisz podać cenę aukcji' });
    min(schema.price, 0, { message: 'Min. cena to "0" - za darmo' });
    required(schema.imgId, genericReq);
    min(schema.imgId, 1, { message: 'Min. 1!' });
    max(schema.imgId, 1080, { message: 'Max 1080!' });
    */

    validateStandardSchema(schema, AuctionModelSchema);
  });

  auctionsService = inject(AuctionsService);

  imgPreviewUrl = computed(() => {
    const imgId = this.auctionModel().imgId;
    if (imgId <= 0) {
      return `https://picsum.photos/id/1/600/600`;
    }
    return `https://picsum.photos/id/${imgId}/600/600`;
  });

  handleSubmit() {
    if (this.auctionForm().invalid()) {
      this.auctionForm().markAsTouched();
      return;
    }
    console.log('WYSYŁAM!', this.auctionModel());

    const { title, description, price } = this.auctionModel();
    const auction: Omit<AuctionItem, 'uid'> = {
      title,
      price,
      description,
      imgUrl: this.imgPreviewUrl(),
    };
    
    this.auctionsService.addNew(auction).subscribe({
      next: (a: AuctionItem) => {
        this.auctionModel.set({
          title: '',
          price: 0,
          imgId: 1,
          description: '',
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
