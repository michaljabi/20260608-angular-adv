import { Component } from '@angular/core';
import { MenuGroup } from './menu-item';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  imports: [RouterLink],
  template: `
    <nav class="menu column">
      @for (menuItem of menuGroups; track menuItem) {
        <p class="menu-label">{{ menuItem.label }}</p>
        <ul class="menu-list">
          @for (child of menuItem.children; track child) {
            <li>
              <a [routerLink]="child.link"> {{ child.label }} </a>
            </li>
          }
        </ul>
      }
    </nav>
  `,
  styles: ``,
})
export class MainMenuComponent {
  menuGroups: MenuGroup[] = [
    {
      label: 'Część A - Sygnały',
      children: [
        { label: 'Podstawy sygnałów', link: '/a-signals-basic' },
        { label: 'Computed (wartości pochodne)', link: '/a-computed' },
        { label: 'Efekty', link: '/a-effects' },
        { label: 'Store (komunikacja)', link: '/a-signal-store' },
        { label: 'LinkedSignal (zapisywalny computed)', link: '/a-linked-signal' },
        { label: 'httpResource (zasób HTTP)', link: '/a-http-resource' },
        { label: 'RxJS interop (toSignal/toObservable)', link: '/a-rxjs-interop' },
      ],
    },
    {
      label: 'Część B - Strumienie RxJs',
      children: [
        {
          label: 'RxJS w cyklu życia komponentu',
          link: '/b-in-component-lifecycle',
        },
        {
          label: 'Q1: skończony czy nieskończony?',
          link: '/b-has-end-or-not',
        },
        {
          label: 'Q2: ciepły czy zimny?',
          link: '/b-cold-or-hot-observable',
        },
        {
          label: 'jak utrzymać stan?',
          link: '/b-hold-state-behaviour-subject',
        },
        {
          label: 'serwisy: stateful i stateless',
          link: '/b-stateful-stateless',
        },
      ],
    },
    {
      label: 'Część C - NgRx Stores',
      children: [
        { label: 'Prosty store', link: '/c-simple-store' },
        { label: 'Prosty interaktywny store', link: '/c-simple-with-actions-store' },
        { label: 'Store z efektem (walidacja)', link: '/c-simple-with-effect-store' },
        { label: 'Store entities', link: '/c-entities-store' },
      ],
    },
    {
      label: 'Część D - Signal Forms',
      children: [
        { label: 'Podstawy (bez walidacji)', link: '/d-confirmation-form' },
        { label: 'Walidatory Angular', link: '/d-newsletter-sign' },
        { label: 'Walidacja Zod', link: '/d-newsletter-sign-zod' },
        { label: 'Formularz dynamiczny (Zod)', link: '/d-add-post' },
        { label: 'Złożony formularz (konto + adres)', link: '/d-create-account' },
      ],
    },
    {
      label: 'Część E - Agenci AI',
      children: [
        { label: 'Okno kontekstu i reguły', link: '/e-context-window' },
        { label: 'The Plan Mode', link: '/e-plan-mode' },
        { label: 'Najfajniejszy Skill', link: '/e-grill-me-skill' },
        { label: 'Servery MCP dla Frontu', link: '/e-mcp-servers' },
        { label: 'Spec driven Za i Przeciw', link: '/e-spec-driven-pros-and-cons' },
        { label: 'Integracja z projektem', link: '/e-integration' },
      ],
    },
  ];
}
