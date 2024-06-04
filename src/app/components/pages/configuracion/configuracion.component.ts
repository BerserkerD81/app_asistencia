import { Component } from '@angular/core';
import { NavBarComponent } from '../../partials/general/nav-bar/nav-bar.component';
import { SideBarComponent } from '../../partials/general/side-bar/side-bar.component';
import { PanelComponent } from '../../partials/general/panel/panel.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css',
  imports: [NavBarComponent, SideBarComponent, PanelComponent, FormsModule]
})
export class ConfiguracionComponent {
  nombre: string;
  password: string;
  confirmarPassword: string;
  rol: string;
  rut: string;

  cambiarContrasena: boolean = false;

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _errorService: ErrorService
  ) {

    this.nombre = this._authService.getNombre();
    this.password = '';
    this.confirmarPassword = '';
    this.rol = this._authService.getRol();
    this.rut = this._authService.getRut();

  }
  guardarConfig(){
    //alerta para que el usuario condirme si quiere hacer los cambios

    if(confirm('¿Desea guardar los cambios?') && this.password == this.confirmarPassword && this.password != ''){
      const user: User = {
        rut: this.rut,
        password: this.password,
        rol:this.rol,
        nombre:this.nombre,
        estado:"activo",
        email:"test"
      }
  
      this._userService.configUser(user).subscribe({
        next: (v) => {
          alert(`${this.nombre}, se a guardado tu configuración`)
          
        },
        error: (e: HttpErrorResponse) => {
          this._errorService.msjError(e);
        }
      })
    }

   
    
  }
}

