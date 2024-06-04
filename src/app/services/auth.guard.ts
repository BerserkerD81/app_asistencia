// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Permitir acceso si el usuario está autenticado
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false; // Redirigir al usuario al componente de inicio de sesión si no está autenticado
    }
    console.log(this.authService.isAuthenticated());
  }
}
