import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {CartaComponent} from './pages/home/carta/carta.component';
import {ReservasComponent} from './pages/reservas/reservas.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'carta', component: CartaComponent},
  {path: 'reservas', component: ReservasComponent},
];
