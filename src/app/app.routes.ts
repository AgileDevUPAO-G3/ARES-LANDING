import { Routes } from '@angular/router';
import { MesasDisponiblesComponent } from './pages/mesas-disponibles/mesas-disponibles.component';

export const routes: Routes = [
  { path: '', redirectTo: 'mesas-disponibles', pathMatch: 'full' },
  { path: 'mesas-disponibles', component: MesasDisponiblesComponent }
];
