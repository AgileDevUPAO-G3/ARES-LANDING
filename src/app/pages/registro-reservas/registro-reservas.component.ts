import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro-reservas',
  standalone: true,
  imports: [],
  templateUrl: './registro-reservas.component.html',
  styleUrls: ['./registro-reservas.component.css']
})
export class RegistroReservasComponent implements OnInit {
  mesaId: string | null = null;
  fecha: string = '';
  hora: string = '';

  constructor(private route: ActivatedRoute) {
    this.mesaId = this.route.snapshot.paramMap.get('mesaId');
  }
  
  ngOnInit(): void {
    this.mesaId = this.route.snapshot.paramMap.get('mesaId');

    this.route.queryParams.subscribe(params => {
      this.fecha = params['fecha'] || '';
      this.hora = params['hora'] || '';
    });
  }
}
