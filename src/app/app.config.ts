import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';
import { LoaderInterceptor } from './interceptors/loader.interceptor'; // <-- import corretto

export const appConfig: ApplicationConfig = {
  providers: [
    // Migliora performance del change detection
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Router
    provideRouter(routes),

    // HTTP Client con interceptor globale
    provideHttpClient(
      withInterceptorsFromDi() // prende tutti gli interceptor registrati tramite DI
    ),

    // Registrazione dell'interceptor in DI
    LoaderInterceptor
  ]
};
