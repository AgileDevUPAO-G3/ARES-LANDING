import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {HomeComponent} from './pages/home/home.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {ReservasComponent} from './pages/reservas/reservas.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, FooterComponent, ReservasComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ARES-LANDING';
}
