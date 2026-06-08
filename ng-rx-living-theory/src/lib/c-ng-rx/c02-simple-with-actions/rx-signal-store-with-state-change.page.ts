import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageComponent } from '../../common/page/page.component';
import { HardwareWithMethodsStore } from './hardware-with-methods.store';
import { I18nPluralPipe } from '@angular/common';

@Component({
  selector: 'app-rx-signal-store-with-state-change',
  imports: [FormsModule, PageComponent, I18nPluralPipe],
  template: `
    <app-page
      pageTitle="Signal Store z akcjami (metodami)"
      pageDescription="Stan z metodami do jego zmiany. W tym przykładzie dodajemy i usuwamy narzędzia z listy."
      fileMatch="c-ng-rx/c02-simple-with-actions/rx-signal-store-with-state-change.page.ts"
    >
      <nav class="panel is-primary mx-auto" style="max-width: 480px;">
        <p class="panel-heading">Lista narzędzi</p>

        <div class="panel-block">
          <form class="field has-addons" style="width: 100%;" (ngSubmit)="add()">
            <div class="control is-expanded">
              <input
                class="input"
                type="text"
                placeholder="Dodaj narzędzie…"
                [(ngModel)]="newTool"
                name="newTool"
              />
            </div>
            <div class="control">
              <button class="button is-primary" type="submit" [disabled]="!newTool().trim()">
                Dodaj
              </button>
            </div>
          </form>
        </div>

        @for (tool of store.availableTools(); track tool) {
          <a class="panel-block is-active">
            <span class="panel-icon">
              <i class="fas fa-wrench" aria-hidden="true"></i>
            </span>
            <span style="flex: 1;">{{ tool }}</span>
            <button
              class="delete"
              type="button"
              aria-label="remove"
              (click)="store.removeTool(tool)"
            ></button>
          </a>
        }

        <div class="panel-block has-text-grey is-size-7">
          {{
            store.availableTools().length
              | i18nPlural
                : {
                    '=0': 'Brak narzędzi',
                    one: '# narzędzie',
                    few: '# narzędzia',
                    many: '# narzędzi',
                    other: '# narzędzi',
                  }
          }}
        </div>
      </nav>
    </app-page>
  `,
  providers: [HardwareWithMethodsStore],
})
export class RxSignalStoreWithStateChangePage {
  readonly store = inject(HardwareWithMethodsStore);
  readonly newTool = signal('');

  add(): void {
    this.store.addTool(this.newTool());
    this.newTool.set('');
  }
}