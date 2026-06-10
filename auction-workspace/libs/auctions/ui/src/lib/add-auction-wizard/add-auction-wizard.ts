import { Component, computed, inject, output, signal } from '@angular/core';
import {
  Field,
  form,
  FormField,
  FormRoot,
  validateStandardSchema,
} from '@angular/forms/signals';
import { AuctionItemWithoutUid } from '@auction-workspace/shared/domain';
import { AddAuctionWizardStore } from './add-auction-wizard.store';
import { step1Schema, step2Schema } from './auction-form.schema';
import { PicsumPhotoChooser } from './picsum-photo-chooser';

const INITIAL = {
  title: '',
  price: 0,
  imgUrl: 'https://picsum.photos/id/1/600/400',
  isPromoted: false,
  description: '',
};

// Przynależność pól do kroków pochodzi WPROST ze slice'ów (Zod `.shape`) —
// jedno źródło prawdy współdzielone przez walidację i pilnowanie kroków.
const STEP_FIELDS = [
  Object.keys(step1Schema.shape),
  Object.keys(step2Schema.shape),
] as const;

@Component({
  selector: 'lib-add-auction-wizard',
  imports: [FormRoot, FormField, PicsumPhotoChooser],
  providers: [AddAuctionWizardStore],
  template: `
    <form class="card" [formRoot]="auctionForm">
      <div class="card-header">
        Dodaj aukcję — krok {{ store.stepIndex() + 1 }}/{{ store.stepCount() }}
        @if (auctionForm.title().value()) {
          <em>{{ auctionForm.title().value() }}</em>
        }
        <div class="progress mt-2" style="height: 4px">
          <div
            class="progress-bar"
            role="progressbar"
            [style.width.%]="store.progress() * 100"
          ></div>
        </div>
      </div>
      <div class="card-body">
        @switch (store.stepIndex()) {
          @case (0) {
            <div class="mb-3">
              <label class="form-label" for="title">Nazwa aukcji *</label>
              <input
                id="title"
                class="form-control"
                [class.is-invalid]="showErrors(auctionForm.title)"
                [formField]="auctionForm.title"
              />
              @if (showErrors(auctionForm.title)) {
                <div class="invalid-feedback d-block">
                  @for (e of auctionForm.title().errors(); track e.kind) {
                    <div>{{ e.message }}</div>
                  }
                </div>
              }
            </div>
            <div class="mb-3">
              <label class="form-label" for="price">Cena (zł) *</label>
              <input
                id="price"
                type="number"
                class="form-control"
                [class.is-invalid]="showErrors(auctionForm.price)"
                [formField]="auctionForm.price"
              />
              @if (showErrors(auctionForm.price)) {
                <div class="invalid-feedback d-block">
                  @for (e of auctionForm.price().errors(); track e.kind) {
                    <div>{{ e.message }}</div>
                  }
                </div>
              }
            </div>
          }
          @case (1) {
            <div class="row g-3">
              @if (imageValid()) {
                <div class="col-12">
                  <img
                    class="img-thumbnail d-block mx-auto"
                    [src]="auctionModel().imgUrl"
                    alt="Podgląd"
                  />
                </div>
              }
              <div class="col-md-6">
                <label class="form-label" for="imgUrl"
                  >Własny URL zdjęcia *</label
                >
                <input
                  id="imgUrl"
                  class="form-control"
                  [class.is-invalid]="showErrors(auctionForm.imgUrl)"
                  [formField]="auctionForm.imgUrl"
                />
                <div class="form-text">Wklej dowolny adres obrazka.</div>
                @if (showErrors(auctionForm.imgUrl)) {
                  <div class="invalid-feedback d-block">
                    @for (e of auctionForm.imgUrl().errors(); track e.kind) {
                      <div>{{ e.message }}</div>
                    }
                  </div>
                }
              </div>
              <div class="col-md-6">
                <span class="form-label d-block"
                  >…albo wybierz z galerii Picsum</span
                >
                <lib-picsum-photo-chooser
                  (picked)="auctionForm.imgUrl().value.set($event)"
                />
              </div>
            </div>

            <div class="mt-3">
              <label class="form-label" for="desc">Opis</label>
              <textarea
                id="desc"
                rows="3"
                class="form-control"
                [formField]="auctionForm.description"
              ></textarea>
            </div>
            <div class="form-check mt-3">
              <input
                id="promo"
                type="checkbox"
                class="form-check-input"
                [formField]="auctionForm.isPromoted"
              />
              <label class="form-check-label" for="promo">Promowana</label>
            </div>
          }
          @case (2) {
            @let summary = auctionModel();
            <dl class="row mb-0">
              <dt class="col-4">Nazwa</dt>
              <dd class="col-8">{{ summary.title }}</dd>
              <dt class="col-4">Cena</dt>
              <dd class="col-8">{{ summary.price }} zł</dd>
              <dt class="col-4">Zdjęcie</dt>
              <dd class="col-8 text-truncate">
                <div>
                  <img
                    class="img-thumbnail"
                    [src]="summary.imgUrl"
                    width="200"
                    alt="Podgląd"
                  />
                </div>
                {{ summary.imgUrl }}
              </dd>
              <dt class="col-4">Promowana</dt>
              <dd class="col-8">{{ summary.isPromoted ? 'tak' : 'nie' }}</dd>
              <dt class="col-4">Opis</dt>
              <dd class="col-8">{{ summary.description || '—' }}</dd>
            </dl>
          }
        }
      </div>
      <div class="card-footer d-flex justify-content-between">
        <button
          class="btn btn-outline-secondary"
          type="button"
          (click)="store.prev()"
          [disabled]="store.isFirst()"
        >
          Wstecz
        </button>
        @if (!store.isLast()) {
          <button
            class="btn btn-primary"
            type="button"
            (click)="store.next()"
            [disabled]="!canAdvance()"
          >
            Dalej
          </button>
        } @else {
          <button
            class="btn btn-success"
            type="button"
            (click)="complete()"
            [disabled]="!canComplete()"
          >
            Dodaj aukcję
          </button>
        }
      </div>
    </form>
  `,
  styles: ``,
})
export class AddAuctionWizard {
  protected readonly store = inject(AddAuctionWizardStore);

  completed = output<AuctionItemWithoutUid>();

  protected readonly auctionModel = signal({ ...INITIAL });

  protected readonly auctionForm = form(this.auctionModel, (path) => {
    validateStandardSchema(path, step1Schema);
    validateStandardSchema(path, step2Schema);
  });

  // Czy wszystkie pola danego kroku są poprawne — lista pól ze slice'a schematu.
  private stepValid(i: number): boolean {
    const fields = STEP_FIELDS[i] ?? [];
    const f = this.auctionForm as unknown as Record<
      string,
      () => { valid(): boolean }
    >;
    return fields.every((k) => f[k]().valid());
  }

  protected readonly imageValid = computed(() =>
    this.auctionForm.imgUrl().valid(),
  );
  protected readonly canComplete = computed(
    () => this.stepValid(0) && this.stepValid(1),
  );

  // Pilnowanie czy można "przejść dalej" w wizardzie.
  protected readonly canAdvance = computed(() =>
    this.store.stepIndex() >= STEP_FIELDS.length
      ? true
      : this.stepValid(this.store.stepIndex()),
  );

  protected showErrors<T>(field: Field<T>): boolean {
    return field().touched() && field().invalid();
  }

  protected complete(): void {
    if (!this.canComplete()) return;
    const v = this.auctionModel();
    this.completed.emit({
      title: v.title.trim(),
      imgUrl: v.imgUrl,
      price: v.price ?? 0,
      description: v.description?.trim() || undefined,
      isPromoted: v.isPromoted,
    });
    this.auctionModel.set({ ...INITIAL }); // reset zamiast form.reset() - robimy "wartości początkowe", spread potrzebny; żeby sygnał wyemitował!
    this.store.reset();
  }
}
