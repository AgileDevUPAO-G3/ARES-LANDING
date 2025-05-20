import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro-reservas',
  standalone: true,
  imports: [],
  templateUrl: './registro-reservas.component.html',
  styleUrls: ['./registro-reservas.component.css']
})
export class RegistroReservasComponent {
  mesaId: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.mesaId = this.route.snapshot.paramMap.get('mesaId');
  }
}
