import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { form, FormField } from '@angular/forms/signals';
import { PageComponent } from '../../common/page/page.component';

interface ConfirmationModel {
  name: string;
  lastName: string;
  confirm: boolean;
}

@Component({
  selector: 'app-confirmation-form',
  imports: [PageComponent, FormField, JsonPipe],
  template: `<app-page
    pageTitle="Podstawy (bez walidacji)"
    pageDescription="Czyste wiązanie pól z modelem przez Signal Forms — bez walidatorów. Submit zawsze aktywny, po wysłaniu pokazujemy wartość formularza."
    fileMatch="d-signal-forms/d01-basic-example/confirmation-form.page"
  >
    <form class="box" (submit)="onSubmit(); $event.preventDefault()">
      <label class="label">
        Imię
        <input class="input" type="text" [formField]="confirmationForm.name" />
      </label>

      <label class="label">
        Nazwisko
        <input class="input" type="text" [formField]="confirmationForm.lastName" />
      </label>

      <label class="checkbox mt-2">
        <input type="checkbox" [formField]="confirmationForm.confirm" />
        Potwierdzam zgody marketingowe
      </label>

      <div class="is-flex is-justify-content-end p-4">
        <button class="button is-primary" type="submit">Wyślij</button>
      </div>
    </form>

    @if (submitted(); as value) {
      <div class="notification is-success">
        <p class="has-text-weight-semibold">Dane formularza:</p>
        <pre>{{ value | json }}</pre>
      </div>
    }
  </app-page>`,
  styles: ``,
})
export class ConfirmationFormPage {
  // 📃 Doc: https://angular.dev/guide/forms/signals/overview

  // 📃 Doc: https://angular.dev/guide/forms/signals/models#creating-models
  // 📃 Doc: https://angular.dev/guide/forms/signals/model-design
  protected readonly dataModel = signal<ConfirmationModel>({
    name: '',
    lastName: '',
    confirm: false,
  });

  // 📃 Doc: https://angular.dev/guide/forms/signals/models#using-typescript-types
  protected readonly confirmationForm = form(this.dataModel);

  // pomocniczy sygnał potwierdzający, że formularz został wysłany
  protected readonly submitted = signal<ConfirmationModel | null>(null);

  protected onSubmit(): void {
    this.submitted.set(this.confirmationForm().value());
  }
}