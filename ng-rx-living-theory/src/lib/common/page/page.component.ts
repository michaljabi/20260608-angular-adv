import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page',
  imports: [],
  template: ` <section class="section">
    <h2 class="title is-2 has-text-right">{{ pageTitle() }}</h2>
    @if (pageDescription(); as desc) {
      <p class="subtitle is-6 has-text-right">{{ desc }}</p>
    }
    @if (fileMatch(); as fm) {
      <span class="tag is-family-monospace mb-3">{{ fm }}</span>
    }
    <hr />
    <ng-content />
  </section>`,
  styles: ``,
})
export class PageComponent {
  pageTitle = input('Przykładowa strona');
  pageDescription = input('');
  fileMatch = input('');
}
