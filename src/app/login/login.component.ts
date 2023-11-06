// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string = '';  // Añade esta línea para manejar el mensaje de error
  successMessage: string = ''; // Añade esta línea para manejar el mensaje de éxito

  constructor(private authService: AuthService, private router: Router) {}

  login(emailOUsuario: string, password: string) {
    this.authService.login(emailOUsuario, password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token); // Guarda el token en el almacenamiento local
        this.router.navigate(['/users']); // Redirige al usuario a la ruta 'users'
      },
      error: (error) => {
        console.error('Error de inicio de sesión', error);
        // Aquí deberías mostrar un mensaje de error al usuario
      }
    });
  }
}
