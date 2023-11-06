// register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(username: string, email: string, password: string) {
    this.authService.register(username, email, password).subscribe({
      next: (response) => {
        // Manejo de respuesta exitosa, como mostrar un mensaje al usuario
        this.router.navigate(['/login']); // Redirige al usuario a la ruta de inicio de sesión
      },
      error: (error) => {
        console.error('Error al registrarse', error);
        // Aquí deberías mostrar un mensaje de error al usuario
      }
    });
  }
}
