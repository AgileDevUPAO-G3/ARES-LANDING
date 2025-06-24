import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {CartaComponent} from './pages/home/carta/carta.component';
import {ReservasComponent} from './pages/reservas/reservas.component';
import { RegistroReservasComponent } from './pages/registro-reservas/registro-reservas.component';
import { ListaReservasComponent } from './pages/lista-reservas/lista-reservas.component';
import {
  ReservaExitosaComponent
} from './pages/registro-reservas/Reserva-estados/reserva-exitosa/reserva-exitosa.component';
import {
  ReservaEnProcesoComponent
} from './pages/registro-reservas/Reserva-estados/reserva-en-proceso/reserva-en-proceso.component';
import {ReservaErrorComponent} from './pages/registro-reservas/Reserva-estados/reserva-error/reserva-error.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { EstadoMesasComponent } from './pages/estado-mesas/estado-mesas.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'carta', component: CartaComponent},
  { path: 'reservas', component: ReservasComponent},
  { path: 'registro-reservas/:mesaId', component: RegistroReservasComponent },
  { path: 'reserva-exitosa', component: ReservaExitosaComponent },
  { path: 'reserva-en-proceso', component: ReservaEnProcesoComponent },
  { path: 'reserva-error', component: ReservaErrorComponent },
  { path: 'login', component: LoginComponent},
  { path: 'admin', component: AdminDashboardComponent},
  { path: 'admin/lista-reservas', component: ListaReservasComponent},
  { path: 'admin/estado-mesas', component: EstadoMesasComponent}
];
