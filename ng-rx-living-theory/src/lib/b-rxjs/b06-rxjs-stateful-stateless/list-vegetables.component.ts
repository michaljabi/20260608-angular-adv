import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RxjsStatefulVegetablesService } from './rxjs-stateful-vegetables.service';

@Component({
  selector: 'app-list-vegetables',
  imports: [AsyncPipe, FormsModule],
  template: `
    <blockquote class="mt-6">
      Kolejny sposób komunikacji między komponentami w Angular, po przez użycie RxJS
      <code> BehaviorSubject </code> w środku <code>service</code>.
      <p>...</p>
    </blockquote>
    <div class="panel is-link">
      <div class="panel-heading">
        Lista warzyw ({{ statefulVegetableService.numberOfVegetable$ | async }})
      </div>
      @for (vegetable of statefulVegetableService.vegetable$ | async; track vegetable) {
        <div class="panel-block">
          {{ vegetable }}
        </div>
      }
      @if (statefulVegetableService.numberOfVegetable$ | async) {
        <div class="panel-block is-justify-content-end">
          <button
            class="button is-danger is-small"
            type="button"
            (click)="statefulVegetableService.removeAll()"
          >
            Usuń wszystkie
          </button>
        </div>
      }
    </div>
    <div class="is-flex is-column-gap-2.5 is-justify-content-end">
      <div class="select">
        <select [(ngModel)]="newVegetable">
          <option>onion</option>
          <option>garlic</option>
          <option>tomato</option>
          <option>potato</option>
        </select>
      </div>
      <button
        class="button is-primary"
        type="button"
        (click)="statefulVegetableService.add(newVegetable())"
      >
        dodaj {{ newVegetable() }}...
      </button>
    </div>
  `
})
export class ListVegetablesComponent {
  newVegetable = signal('onion');
  statefulVegetableService = inject(RxjsStatefulVegetablesService);
}
