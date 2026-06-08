import { Component } from '@angular/core';
import { RemoveVeggiesButtonComponent } from './remove-veggies-button.component';

@Component({
  selector: 'app-control-panel',
  imports: [RemoveVeggiesButtonComponent],
  template: ` <div class="panel-block is-justify-content-end">
    <app-remove-veggies-button />
  </div>`,
  styles: ``,
})
export class ControlPanelComponent {}
