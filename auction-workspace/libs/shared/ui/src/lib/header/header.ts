import { Component } from '@angular/core';

@Component({
  selector: 'lib-header',
  imports: [],
  template: `
    <header class="p-4 bg-success text-white">
      <h1>Auction Portal</h1>
      <h4 class="text-muted text-white-50">
        Funkcja - "kup teraz" już działa!
      </h4>
    </header>
  `,
  styles: ``,
})
export class Header {}
