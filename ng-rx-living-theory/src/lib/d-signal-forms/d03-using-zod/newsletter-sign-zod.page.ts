import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  form,
  FormField,
  submit,
  validateStandardSchema,
} from '@angular/forms/signals';
import { z } from 'zod';
import { PageComponent } from '../../common/page/page.component';

const NewsletterSchema = z.object({
  name: z.string().min(2, 'Imię musi mieć min. 2 znaki'),
  lastName: z.string().min(2, 'Nazwisko musi mieć min. 2 znaki'),
  email: z.email('Nieprawidłowy adres e-mail'),
  agree: z.boolean().refine((v) => v, {
    message: 'Musisz wyrazić zgodę',
  }),
  newsletter: z.boolean(),
});

type NewsletterModel = z.infer<typeof NewsletterSchema>;

@Component({
  selector: 'app-newsletter-sign-zod',
  imports: [PageComponent, FormField, JsonPipe, FormsModule],
  template: `<app-page
    pageTitle="Walidacja Zod"
    pageDescription="Ten sam formularz co poprzednio, ale walidacja pochodzi z jednego schematu Zod podłączonego przez validateStandardSchema. Komunikaty błędów definiujemy w schemacie."
    fileMatch="d-signal-forms/d03-using-zod/newsletter-sign-zod.page"
  >
    <form class="box" (ngSubmit)="onSubmit()">
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
export class NewsletterSignZodPage {
  protected readonly model = signal<NewsletterModel>({
    name: '',
    lastName: '',
    email: '',
    agree: false,
    newsletter: false,
  });

  protected readonly newsletterForm = form(this.model, (p) => {
    // 📃 Doc: https://angular.dev/guide/forms/signals/schemas
    validateStandardSchema(p, NewsletterSchema);
  });

  protected readonly submitted = signal<NewsletterModel | null>(null);

  protected async onSubmit(): Promise<void> {
    await submit(this.newsletterForm, async (f) => {
      this.submitted.set(f().value());
    });
  }
}