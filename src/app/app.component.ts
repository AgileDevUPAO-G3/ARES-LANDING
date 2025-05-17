import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {HomeComponent} from './pages/home/home.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {ReservasComponent} from './pages/reservas/reservas.component';
import {PagosComponent } from './pages/pagos/pagos.component';

@Component({
  selector: 'app-root',
<<<<<<< HEAD
  imports: [NavbarComponent, FooterComponent, ReservasComponent, PagosComponent, HomeComponent],
=======
  imports: [NavbarComponent, FooterComponent, ReservasComponent, HomeComponent, RouterOutlet],
>>>>>>> d5eae692ef0cc25239ec8140cb0f292c2734b789
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ARES-LANDING';
}
