// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:3000/api/login';
  private registerUrl = 'http://localhost:3000/api/register';
  private usersUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  // Iniciar sesión
  login(emailOUsuario: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { emailOUsuario, password })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Obtener usuarios
  getUsers(): Observable<any> {
    // Se asume que el token ya está almacenado en el almacenamiento local
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.usersUrl, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para registrar un nuevo usuario
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(this.registerUrl, { username, email, password })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Guardar el token
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Eliminar el token
  logout(): void {
    localStorage.removeItem('token');
  }

  // Comprobar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Aquí podrías añadir lógica para validar el token si es necesario
    return !!token;
  }

  // Manejar errores
  private handleError(error: any) {
    console.error('An error occurred', error.error.message);
    return throwError(error.error.message || 'Server error');
  }
}
