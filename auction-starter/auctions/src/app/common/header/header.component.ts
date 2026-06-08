import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <header class="mb-2 p-5 bg-warning">
      <h1>{{ appTitle() }} </h1>
      <h4> Kup teraz - już działa!</h4>
    </header>
  `,
  styles: ``
})
export class HeaderComponent {
  appTitle = input('Portal aukcyjny')
}
