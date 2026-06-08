import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainMenuComponent } from '../lib/common/main-menu/main-menu.component';
import { HeaderComponent } from '../lib/common/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainMenuComponent, HeaderComponent],
  template: `
    <main class="container mb-5">
      <app-header />
      <section class="columns mt-5">
        <app-main-menu />
        <div class="column is-9 content">
          <router-outlet />
        </div>
      </section>
    </main>
  `,
})
export class App {}
