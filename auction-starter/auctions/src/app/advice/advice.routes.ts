import {Routes} from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./advices-page/advices-page.component').then((m) => m.AdvicesPageComponent), children: [
    { path: ':adviceId', loadComponent: () => import('./advices-page/advice-details.component').then((m) => m.AdviceDetailsComponent) },
    ]
  },
];
