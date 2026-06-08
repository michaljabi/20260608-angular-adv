import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './common/header/header.component';
import { MainMenuComponent } from './common/main-menu/main-menu.component';

@Component({
  imports: [RouterOutlet, HeaderComponent, MainMenuComponent],
  selector: 'app-root',
  template: `
    <app-header />
    <main class="container">
      <app-main-menu />
      <router-outlet></router-outlet>
    </main>
  `,
})
export class App {}

