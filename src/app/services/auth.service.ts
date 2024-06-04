import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private isLoggedIn = false;
  private readonly TOKEN_KEY = 'token';

  constructor() { }

  //método para iniciar sesión y guardar el token en el almacenamiento local
  login(token: string, rol: string) {
    //this.isLoggedIn = true;
    localStorage.setItem(this.TOKEN_KEY, token);
    console.log("TOKEN: "+token+" ROL: "+ rol + this.TOKEN_KEY)
  }

  //metodo para obtener el token del almacenamiento local
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  //método para cerrar sesión
  logout() {
    //this.isLoggedIn = false;
    //eliminar token de inicio de sesión
    localStorage.removeItem(this.TOKEN_KEY);
  }

  //método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    //return this.isLoggedIn;
    const token = this.getToken();
    //verificar si el token existe y no está caducado
    return token != null && !this.isTokenExpired(token);
  }
  
  //método para verificar si el token ha caducado
  private isTokenExpired(token: string): boolean {
    //obtener la fecha de caducidad del token
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    //verificar si la fecha de caducidad es mayor que la fecha actual
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  // Decode the token to extract the payload
  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  // Get user rut from the token
  getRut(): string {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      return decoded.rut;
    }
    return '';
  }

  // Get user rol from the token
  getRol(): string{
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      return decoded.rol;
    }
    return '';
  }

  // Get user nombre from the token
  getNombre(): string{
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      return decoded.nombre;
    }
    return '';
  }
}
