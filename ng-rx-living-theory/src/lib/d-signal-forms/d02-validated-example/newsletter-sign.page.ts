import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  email,
  form,
  FormField,
  minLength,
  required,
  submit,
} from '@angular/forms/signals';
import { PageComponent } from '../../common/page/page.component';
import { FormsModule } from '@angular/forms';

interface NewsletterModel {
  name: string;
  lastName: string;
  email: string;
  agree: boolean;
  newsletter: boolean;
}

@Component({
  selector: 'app-newsletter-sign',
  imports: [PageComponent, FormField, JsonPipe, FormsModule],
  template: `<app-page
    pageTitle="Walidatory Angular"
    pageDescription="Ten sam formularz, ale z wbudowanymi walidatorami Signal Forms (required, minLength, email). Stan pola pokazujemy konwencją Bulma, a submit() oznacza wszystkie pola jako dotknięte."
    fileMatch="d-signal-forms/d02-validated-example/newsletter-sign.page"
  >
    <form class="box" (ngSubmit)="onSubmit();">
      <div class="field">
        <label class="label">Imię</label>
        <div class="control">
          <input
            class="input"
            type="text"
            [class.is-danger]="
              newsletterForm.name().touched() && newsletterForm.name().invalid()
            "
            [class.is-success]="
              newsletterForm.name().touched() && newsletterForm.name().valid()
            "
            [formField]="newsletterForm.name"
          />
        </div>
        @if (newsletterForm.name().touched()) {
          @for (e of newsletterForm.name().errors(); track e.kind) {
            <p class="help is-danger">{{ e.message }}</p>
          }
        }
      </div>

      <div class="field">
        <label class="label">Nazwisko</label>
        <div class="control">
          <input
            class="input"
            type="text"
            [class.is-danger]="
              newsletterForm.lastName().touched() &&
              newsletterForm.lastName().invalid()
            "
            [class.is-success]="
              newsletterForm.lastName().touched() &&
              newsletterForm.lastName().valid()
            "
            [formField]="newsletterForm.lastName"
          />
        </div>
        @if (newsletterForm.lastName().touched()) {
          @for (e of newsletterForm.lastName().errors(); track e.kind) {
            <p class="help is-danger">{{ e.message }}</p>
          }
        }
      </div>

      <div class="field">
        <label class="label">E-mail</label>
        <div class="control">
          <input
            class="input"
            type="email"
            [class.is-danger]="
              newsletterForm.email().touched() &&
              newsletterForm.email().invalid()
            "
            [class.is-success]="
              newsletterForm.email().touched() && newsletterForm.email().valid()
            "
            [formField]="newsletterForm.email"
          />
        </div>
        @if (newsletterForm.email().touched()) {
          @for (e of newsletterForm.email().errors(); track e.kind) {
            <p class="help is-danger">{{ e.message }}</p>
          }
        }
      </div>

      <div class="field">
        <label class="checkbox">
          <input type="checkbox" [formField]="newsletterForm.agree" />
          Zgoda na otrzymywanie wiadomości e-mail
        </label>
        @if (newsletterForm.agree().touched()) {
          @for (e of newsletterForm.agree().errors(); track e.kind) {
            <p class="help is-danger">{{ e.message }}</p>
          }
        }
      </div>

      <div class="field">
        <label class="checkbox">
          <input type="checkbox" [formField]="newsletterForm.newsletter" />
          Zapisz mnie do newslettera
        </label>
      </div>

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
export class NewsletterSignPage {
  protected readonly model = signal<NewsletterModel>({
    name: '',
    lastName: '',
    email: '',
    agree: false,
    newsletter: false,
  });

  protected readonly newsletterForm = form(this.model, (p) => {
    // 📃 Doc: https://angular.dev/guide/forms/signals/validation
    required(p.name, { message: 'Imię jest wymagane' });
    minLength(p.name, 2, { message: 'Imię musi mieć min. 2 znaki' });

    required(p.lastName, { message: 'Nazwisko jest wymagane' });
    minLength(p.lastName, 2, { message: 'Nazwisko musi mieć min. 2 znaki' });

    required(p.email, { message: 'E-mail jest wymagany' });
    email(p.email, { message: 'Nieprawidłowy adres e-mail' });

    required(p.agree, { message: 'Musisz wyrazić zgodę' });
  });

  protected readonly submitted = signal<NewsletterModel | null>(null);

  protected async onSubmit(): Promise<void> {
    await submit(this.newsletterForm, async (f) => {
      this.submitted.set(f().value());
    });
  }
}