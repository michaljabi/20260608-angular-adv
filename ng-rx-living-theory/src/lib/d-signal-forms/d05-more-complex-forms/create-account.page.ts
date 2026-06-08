import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  applyWhen,
  form,
  FormField,
  submit,
  validateHttp,
  validateStandardSchema,
} from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { PageComponent } from '../../common/page/page.component';
import {
  CreateAccountModel,
  UserAddressSchema,
  UserSchema,
} from './user.schema';

@Component({
  selector: 'app-create-account',
  imports: [PageComponent, FormField, JsonPipe, FormsModule],
  template: `<app-page
    pageTitle="Złożony formularz – konto + adres"
    pageDescription="Rejestracja konta z osobną, opcjonalną częścią adresu. Walidacja jest podzielona na części: schemat Zod 'User' dla konta i osobny schemat 'UserAddress' dla adresu (aplikowany tylko gdy adres dodany). E-mail dodatkowo sprawdzany asynchronicznie na serwerze (validateHttp) – pod kątem unikalności."
    fileMatch="d-signal-forms/d05-more-complex-forms/create-account.page"
  >
    <form class="box" (ngSubmit)="onSubmit()">
      <div class="field">
        <label class="label">Imię i nazwisko</label>
        <div class="control">
          <input
            class="input"
            type="text"
            [class.is-danger]="
              accountForm.name().touched() && accountForm.name().invalid()
            "
            [class.is-success]="
              accountForm.name().touched() && accountForm.name().valid()
            "
            [formField]="accountForm.name"
          />
        </div>
        @if (accountForm.name().touched()) {
          @for (e of accountForm.name().errors(); track e.kind) {
            <p class="help is-danger">{{ e.message }}</p>
          }
        }
      </div>

      <div class="field">
        <label class="label">Login</label>
        <div class="control">
          <input
            class="input"
            type="text"
            [class.is-danger]="
              accountForm.username().touched() &&
              accountForm.username().invalid()
            "
            [class.is-success]="
              accountForm.username().touched() &&
              accountForm.username().valid()
            "
            [formField]="accountForm.username"
          />
        </div>
        @if (accountForm.username().touched()) {
          @for (e of accountForm.username().errors(); track e.kind) {
            <p class="help is-danger">{{ e.message }}</p>
          }
        }
      </div>

      <div class="field">
        <label class="label">E-mail</label>
        <div class="control" [class.is-loading]="accountForm.email().pending()">
          <input
            class="input"
            type="email"
            [class.is-danger]="
              accountForm.email().touched() && accountForm.email().invalid()
            "
            [class.is-success]="
              accountForm.email().touched() && accountForm.email().valid()
            "
            [formField]="accountForm.email"
          />
        </div>
        @if (accountForm.email().pending()) {
          <p class="help">Sprawdzanie dostępności e-maila…</p>
        }
        @if (accountForm.email().touched()) {
          @for (e of accountForm.email().errors(); track e.kind) {
            <p class="help is-danger">{{ e.message }}</p>
          }
        }
      </div>

      <div class="field">
        <label class="label">Telefon</label>
        <div class="control">
          <input
            class="input"
            type="text"
            [class.is-danger]="
              accountForm.phone().touched() && accountForm.phone().invalid()
            "
            [class.is-success]="
              accountForm.phone().touched() && accountForm.phone().valid()
            "
            [formField]="accountForm.phone"
          />
        </div>
        @if (accountForm.phone().touched()) {
          @for (e of accountForm.phone().errors(); track e.kind) {
            <p class="help is-danger">{{ e.message }}</p>
          }
        }
      </div>

      <div class="field">
        <label class="label">Strona WWW</label>
        <div class="control">
          <input
            class="input"
            type="text"
            [class.is-danger]="
              accountForm.website().touched() && accountForm.website().invalid()
            "
            [class.is-success]="
              accountForm.website().touched() && accountForm.website().valid()
            "
            [formField]="accountForm.website"
          />
        </div>
        @if (accountForm.website().touched()) {
          @for (e of accountForm.website().errors(); track e.kind) {
            <p class="help is-danger">{{ e.message }}</p>
          }
        }
      </div>

      <hr />

      <div class="field">
        <label class="checkbox">
          <input type="checkbox" [formField]="accountForm.hasAddress" />
          Dodaj adres
        </label>
      </div>

      @if (accountForm.hasAddress().value()) {
        <fieldset class="box">
          <div class="field">
            <label class="label">Ulica</label>
            <div class="control">
              <input
                class="input"
                type="text"
                [class.is-danger]="
                  accountForm.address.street().touched() &&
                  accountForm.address.street().invalid()
                "
                [formField]="accountForm.address.street"
              />
            </div>
            @if (accountForm.address.street().touched()) {
              @for (e of accountForm.address.street().errors(); track e.kind) {
                <p class="help is-danger">{{ e.message }}</p>
              }
            }
          </div>

          <div class="field">
            <label class="label">Nr / lokal</label>
            <div class="control">
              <input
                class="input"
                type="text"
                [class.is-danger]="
                  accountForm.address.suite().touched() &&
                  accountForm.address.suite().invalid()
                "
                [formField]="accountForm.address.suite"
              />
            </div>
            @if (accountForm.address.suite().touched()) {
              @for (e of accountForm.address.suite().errors(); track e.kind) {
                <p class="help is-danger">{{ e.message }}</p>
              }
            }
          </div>

          <div class="field">
            <label class="label">Miasto</label>
            <div class="control">
              <input
                class="input"
                type="text"
                [class.is-danger]="
                  accountForm.address.city().touched() &&
                  accountForm.address.city().invalid()
                "
                [formField]="accountForm.address.city"
              />
            </div>
            @if (accountForm.address.city().touched()) {
              @for (e of accountForm.address.city().errors(); track e.kind) {
                <p class="help is-danger">{{ e.message }}</p>
              }
            }
          </div>

          <div class="field">
            <label class="label">Kod pocztowy</label>
            <div class="control">
              <input
                class="input"
                type="text"
                [class.is-danger]="
                  accountForm.address.zipcode().touched() &&
                  accountForm.address.zipcode().invalid()
                "
                [formField]="accountForm.address.zipcode"
              />
            </div>
            @if (accountForm.address.zipcode().touched()) {
              @for (e of accountForm.address.zipcode().errors(); track e.kind) {
                <p class="help is-danger">{{ e.message }}</p>
              }
            }
          </div>
        </fieldset>
      }

      <div class="is-flex is-justify-content-end p-4">
        <button
          class="button is-primary"
          type="submit"
          [class.is-loading]="accountForm().submitting()"
        >
          Utwórz konto
        </button>
      </div>
    </form>

    @if (submitted(); as value) {
      <div class="notification is-success">
        <p class="has-text-weight-semibold">Konto utworzone:</p>
        <pre>{{ value | json }}</pre>
      </div>
    }
  </app-page>`,
  styles: ``,
})
export class CreateAccountPage {
  private readonly http = inject(HttpClient);

  protected readonly model = signal<CreateAccountModel>({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    hasAddress: false,
    address: { street: '', suite: '', city: '', zipcode: '' },
  });

  protected readonly accountForm = form(this.model, (p) => {
    // Część "konto" – walidacja schematem User, ale POLE PO POLU.
    //
    // NIE wolno aplikować całego UserSchema do korzenia (p). Walidator schematu
    // tworzy resource, którego `params` czyta CAŁĄ wartość formularza. Odczyt
    // całej wartości materializuje (leniwie) węzeł pola `email`, a `email` ma
    // `validateHttp` → tworzy `httpResource` w konstruktorze węzła. To tworzenie
    // resource zachodzi wtedy WEWNĄTRZ `params` resource schematu → NG0992
    // ("Cannot create a resource inside the `params` of another resource").
    //
    // Walidacja pole-po-polu rozdziela resource na osobne węzły: resource
    // schematu danego pola czyta tylko wartość tego pola, więc nie materializuje
    // rodzeństwa i nie koliduje z `httpResource` e-maila.
    validateStandardSchema(p.name, UserSchema.shape.name);
    validateStandardSchema(p.username, UserSchema.shape.username);
    validateStandardSchema(p.email, UserSchema.shape.email);
    validateStandardSchema(p.phone, UserSchema.shape.phone);
    validateStandardSchema(p.website, UserSchema.shape.website);

    // Część "adres" – osobny schemat, aplikowany TYLKO gdy adres dodany.
    applyWhen(
      p.address,
      () => this.model().hasAddress,
      (addressPath) => validateStandardSchema(addressPath, UserAddressSchema),
    );

    // Asynchroniczna walidacja e-maila (unikalność na serwerze).
    // Uruchamia się dopiero po przejściu walidacji synchronicznej (format e-mail).
    // 📃 Doc: https://angular.dev/guide/forms/signals/async-operations
    validateHttp(p.email, {
      request: (ctx) => {
        const email = ctx.value().trim();
        return email
          ? `/api/users/check-email?email=${encodeURIComponent(email)}`
          : undefined;
      },
      onSuccess: (res: { available: boolean }) =>
        res.available
          ? null
          : { kind: 'emailTaken', message: 'Ten e-mail jest już zarejestrowany' },
      onError: () => null,
      debounce: 400,
    });
  });

  protected readonly submitted = signal<unknown>(null);

  protected async onSubmit(): Promise<void> {
    await submit(this.accountForm, async (f) => {
      const m = f().value();

      const body: Record<string, unknown> = {
        name: m.name,
        username: m.username,
        email: m.email.trim(),
        phone: m.phone,
        website: m.website,
      };

      // Adres dołączamy tylko gdy dodany; geo domyślnie puste (zgodnie z interfejsem User).
      if (m.hasAddress) {
        body['address'] = { ...m.address, geo: { lat: '', lng: '' } };
      }

      try {
        const created = await firstValueFrom(this.http.post('/api/users', body));
        this.submitted.set(created);
        return null;
      } catch (err) {
        if (err instanceof HttpErrorResponse && err.status === 409) {
          return {
            kind: 'emailTaken',
            message: 'Ten e-mail jest już zarejestrowany',
            fieldTree: f.email,
          };
        }
        return { kind: 'serverError', message: 'Nie udało się utworzyć konta' };
      }
    });
  }
}
