import { RenderMode, ServerRoute } from '@angular/ssr';


export const serverRoutes: ServerRoute[] = [
  {
    // a-effects zapisuje formularz newslettera do localStorage, które
    // istnieje tylko w przeglądarce (brak go w prerenderze/SSR).
    // Dlatego ten ekran renderujemy wyłącznie po stronie klienta.
    path: 'a-effects',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];