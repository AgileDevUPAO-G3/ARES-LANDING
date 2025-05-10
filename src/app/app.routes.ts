import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CartaComponent} from './home/components/carta/carta.component';
import {ReservasComponent} from './reservas/reservas.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'carta', component: CartaComponent},
  {path: 'reservas', component: ReservasComponent},
];
