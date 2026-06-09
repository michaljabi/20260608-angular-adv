import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageComponent } from '../../common/page/page.component';
import { HardwareStore } from './hardware.store';

@Component({
  selector: 'app-rx-signal-store-basics',
  imports: [FormsModule, PageComponent],
  template: `
    <app-page
      pageTitle="Prosty Signal Store"
      pageDescription="Stan tylko do odczytu, bez metod do jego zmiany"
      fileMatch="c-ng-rx/c01-simple-store/rx-signal-store-basics.page.ts"
    >
      <nav class="panel is-info mx-auto" style="max-width: 480px;">
        <p class="panel-heading">Lista narzędzi</p>

        @for (tool of store.availableTools(); track tool) {
          <a class="panel-block is-active">
            <span class="panel-icon">
              <i class="fas fa-wrench" aria-hidden="true"></i>
            </span>
            <span style="flex: 1;">{{ tool }}</span>
          </a>
        }

        <div class="panel-block has-text-grey is-size-7">
          {{ store.noOfItems() }} narzędzia
        </div>
          <div class="panel-block has-text-grey is-size-7">
          {{ store.noOfItems() }} narzędzia
        </div>
      </nav>
    </app-page>
  `,
  providers: [],
})
export class RxSignalStoreBasicsPage {
  readonly store = inject(HardwareStore);

  constructor() {
    this.store.addTool('SAMPLE')
    // this.store.addTool('SAMPLE')
    // this.store.addTool('SAMPLE')
  }
}