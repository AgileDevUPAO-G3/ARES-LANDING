import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // ✅ esta línea agrega el cliente HTTP con interceptores
    provideRouter(routes) // ✅ esta línea agrega el enrutador completo
  ]
};
