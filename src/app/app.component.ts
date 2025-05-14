import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import {FooterComponent} from './shared/footer/footer.component';
import {ReservasComponent} from './reservas/reservas.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, HomeComponent, FooterComponent, ReservasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ARES-LANDING';
}
