import { Component, computed, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageComponent } from '../../common/page/page.component';

interface Groceries {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-computed-but-writeable',
  imports: [PageComponent, FormsModule],
  template: `<app-page
    pageTitle="LinkedSignal (computed, ale zapisywalny)"
    pageDescription="linkedSignal() wylicza wartość z innego sygnału (jak computed), ale pozwala ją też nadpisać. Po wybraniu produktu ilość wraca do wartości domyślnej, a użytkownik może ją dalej edytować."
    fileMatch="a-signals/a06-linked-signal/computed-but-writeable.page"
  >
    <div class="is-flex is-column-gap-4">
      <div class="field">
        <label class="label">Produkt</label>
        <div class="control">
          <div class="select">
            <select [ngModel]="selected()" (ngModelChange)="selected.set($event)">
              @for (item of fruitsAndVeggies; track item.name) {
                <option [ngValue]="item">{{ item.name }}</option>
              }
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Ilość</label>
        <div class="control">
          <input
            class="input"
            type="number"
            [ngModel]="quantity()"
            (ngModelChange)="setFormQuantity($event)"
          />
        </div>
      </div>
    </div>

    <p>
      Wybrano: <code>{{ selected().name }}</code> — ilość:
      <code>{{ quantity() }}</code>
    </p>
    <blockquote>
      🪲 Zauważ, że ilość nie zmienia się powyżej jeśli coś wpiszemy samodzielnie w input. Musimy to naprawić 
    </blockquote>
  </app-page>`,
  styles: ``,
})
export class ComputedButWriteablePage {
  protected readonly fruitsAndVeggies: Groceries[] = [
    { name: 'Pomidor', quantity: 50 },
    { name: 'Ogórek', quantity: 30 },
    { name: 'Jabłko', quantity: 100 },
    { name: 'Marchewka', quantity: 80 },
    { name: 'Banan', quantity: 120 },
    { name: 'Cebula', quantity: 25 },
  ];

  protected readonly selected = signal<Groceries>(this.fruitsAndVeggies[0]);

  // ❌ Problem:
  // W tym wariancie, owszem Ilość poprawie nam się zaktualizuje po wybraniu owocu/warzywa,
  // ale nie możemy jej już edytować, bo jest to sygnał tylko do odczytu (readonly).
  protected readonly quantity = computed(() => this.selected().quantity);

  // LinkedSignal
  // 📃 Doc: https://angular.dev/guide/signals/linked-signal
  // Wylicza ilość z wybranego produktu, ale pozostaje zapisywalny.
  // protected readonly quantity = linkedSignal(() => this.selected().quantity);

  setFormQuantity(value: number) {
    // Możemy zrobić .set w linkedSignal
    // this.quantity.set(value);
  }

  // ⚔️ Sidequest: sprawdź, czy rozumiesz koncepcję
  // Przestaw kod, aby korzystał z `linkedSignal`. sprawdź jak działa .set()
  // Zauważ że ani `computed()` ani użycie dodatkowego `signal()` nie rozwiązuje problemu w tym przykładzie.
}