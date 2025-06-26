import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}

  irAReservas(): void {
    this.router.navigate(['/admin/lista-reservas']);
  }

  irAEstadoMesas(): void {
    this.router.navigate(['/admin/estado-mesas']);
  }
}