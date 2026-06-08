import { Component, effect, signal } from '@angular/core';

const STORAGE_KEY = 'nx_theory_newsletter';

@Component({
  selector: 'app-persist-form-with-effect',
  imports: [],
  template: ` <div class="box">
    <div class="field">
      <label class="label">Imię</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Jan"
          [value]="name()"
          (input)="name.set($any($event.target).value)"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
          class="input"
          type="email"
          placeholder="jan@nx.theory"
          [value]="email()"
          (input)="email.set($any($event.target).value)"
        />
      </div>
    </div>

    <div class="field">
      <div class="control">
        <button class="button is-warning" (click)="handleClear()">Wyczyść</button>
      </div>
    </div>

    <p class="help">
      Odśwież stronę — dane wrócą z <code>localStorage</code> (klucz <code>{{ storageKey }}</code>).
    </p>
  </div>`,
  styles: ``,
})
export class PersistFormWithEffectComponent {
  protected readonly storageKey = STORAGE_KEY;
  protected readonly name = signal('');
  protected readonly email = signal('');

  constructor() {
    // Wczytujemy zapisany stan jednorazowo, zanim effect przejmie zapisywanie.
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { name, email } = JSON.parse(saved);
        this.name.set(name ?? '');
        this.email.set(email ?? '');
      }
    } catch {
      // Uszkodzony/stary wpis w localStorage nie powinien wywalić komponentu.
    }

    // ✅ Tutaj effect() jest uzasadniony: synchronizujemy stan sygnałów z
    // zewnętrznym, nie-reaktywnym światem (localStorage). computed() tego nie
    // zrobi — computed tylko WYLICZA wartość w grafie sygnałów, a tu robimy
    // efekt uboczny POZA grafem (zapis do przeglądarki) przy każdej zmianie.
    effect(() => {
      const payload = { name: this.name(), email: this.email() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    });
  }

  handleClear() {
    this.name.set('');
    this.email.set('');
  }
}