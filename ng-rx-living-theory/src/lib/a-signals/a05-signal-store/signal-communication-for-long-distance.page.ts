import { Component, inject } from '@angular/core';
import { VegetableStore } from './vegetable.store';
import { FormsModule } from '@angular/forms';
import { PageComponent } from '../../common/page/page.component';
import { ControlPanelComponent } from './control-panel.component';

@Component({
  selector: 'app-signal-communication-for-long-distance',
  template: `<app-page
    pageTitle="Store (komunikacja)"
    pageDescription="Sygnał umieszczony w serwisie  pozwala komunikować się komponentom bez relacji parent-child."
    fileMatch="a-signals/a05-signal-store/signal-communication-for-long-distance.page"
  >
    <div class="panel is-link">
      <div class="panel-heading">Lista warzyw ({{ vegetableStore.numberOfVegetables() }})</div>
      @for (vegetable of vegetableStore.vegetables(); track vegetable) {
        <div class="panel-block">
          {{ vegetable }}
        </div>
      }
      @if (vegetableStore.numberOfVegetables()) {
        <app-control-panel />
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
      <button class="button is-primary" type="button" (click)="vegetableStore.add(newVegetable)">
        dodaj {{ newVegetable }}...
      </button>
    </div>

    <blockquote class="mt-6">
      Komunikacja między komponentami w Angularze może być realizowana na kilka sposobów, a jednym z
      nich jest użycie <code>signal</code> w środku <code>service</code>.
      <p>
        Wyobraź sobie inny komponent, który nie jest w relacji
        <em>parent - child</em> w stosunku do komponentu
        <code>SignalCommunicationForLongDistance</code>, może on również korzystać z globalnie
        dostępnego (singleton) serwisu <code>VegetableStore</code>. Serwis ten może informować
        dowolny komponent o zmianach. Wystarczy, że zainteresowany komponent wstrzyknie serwis
        <code>VegetableStore</code> i będzie mógł korzystać z jego metod oraz obserwować zmiany w
        liście warzyw.
      </p>
    </blockquote>
  </app-page>`,
  imports: [FormsModule, PageComponent, ControlPanelComponent],
  providers: [VegetableStore],
  styles: ``,
})
export class SignalCommunicationForLongDistancePage {
  newVegetable = 'onion';
  vegetableStore = inject(VegetableStore);
}
