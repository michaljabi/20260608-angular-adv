import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'lib-not-found-page',
  imports: [RouterLink],
  template: `
    <section class="text-center py-5">
      <p class="display-1 fw-bold text-muted mb-0">404</p>
      <h2 class="mb-3">Strona nie znaleziona</h2>
      <p class="text-muted mb-4">
        Przepraszamy, w <code>{{ router.url }}</code> nie ma nic do zobaczenia 🤷.
      </p>
      <a class="btn btn-primary" routerLink="/">Wróć na stronę główną</a>
    </section>
  `,
  styles: ``,
})
export class NotFoundPageComponent {
  router = inject(Router);
}
