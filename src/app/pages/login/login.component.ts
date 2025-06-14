import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (user) => {
        if (user.role === 'ADMIN') {
          this.router.navigate(['/lista-reservas']);
        } else {
          this.error = 'Acceso restringido al administrador';
        }
      },
      error: () => {
        this.error = 'Usuario y/o contraseña incorrecto';
      }
    });
  }
}
