import { ApplicationConfig, provideBrowserGlobalErrorListeners/*, provideZoneChangeDetection*/ } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    // provideZoneChangeDetection() Ta aplikacja jest z automatu zoneless! Możemy `opt-in` w 2 stornę ale potrzebujemy zone.js
  ]
};
