import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nPluralPipe } from '@angular/common';
import { PageComponent } from '../../common/page/page.component';
import { HardwareWithEffectStore } from './hardware-with-effect.store';

@Component({
  selector: 'app-rx-signal-store-with-effect',
  imports: [FormsModule, PageComponent, I18nPluralPipe],
  template: `
    <app-page
      pageTitle="Signal Store z efektem (walidacja)"
      pageDescription="Metody jak w c02, ale efekt reaguje na próbę dodania istniejącego narzędzia i informuje użytkownika."
      fileMatch="c-ng-rx/c03-simple-with-effect/rx-signal-store-with-effect.page.ts"
    >
      <nav class="panel is-primary mx-auto" style="max-width: 480px;">
        <p class="panel-heading">Lista narzędzi</p>

        <div class="panel-block">
          <form style="width: 100%;" (ngSubmit)="add()">
            <div class="field has-addons mb-0">
              <div class="control is-expanded">
                <input
                  class="input"
                  [class.is-danger]="store.duplicateErrorMessage()"
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
            </div>
            @if (store.duplicateErrorMessage(); as err) {
              <p class="help is-danger">{{ err }}</p>
            }
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
  providers: [HardwareWithEffectStore],
})
export class RxSignalStoreWithEffectPage {
  readonly store = inject(HardwareWithEffectStore);
  newTool = signal('');

  add(): void {
    this.store.addTool(this.newTool());
    this.newTool.set('');
  }
}