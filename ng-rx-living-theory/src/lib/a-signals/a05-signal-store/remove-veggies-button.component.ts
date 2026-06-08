import { Component, inject } from '@angular/core';
import { VegetableStore } from './vegetable.store';

@Component({
  selector: 'app-remove-veggies-button',
  imports: [],
  template: ` <button class="button is-danger is-small" type="button" (click)="vegetableStore.removeAll()">
    Usuń wszystkie
  </button>`,
})
export class RemoveVeggiesButtonComponent {
  vegetableStore = inject(VegetableStore);
}
