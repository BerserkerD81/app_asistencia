import { Component } from '@angular/core';
import { GeneralComponent } from '../general/general.component';
import { NavBarComponent } from '../../partials/general/nav-bar/nav-bar.component';
import { SideBarComponent } from '../../partials/general/side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../../services/error.service';
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'crear-webmaster',
  standalone: true,
  imports: [NavBarComponent,SideBarComponent,GeneralComponent,CommonModule,FormsModule],
  templateUrl: './crear-webmaster.component.html',
  styleUrl: './crear-webmaster.component.css'
})
export class CrearWebmasterComponent {
  rut: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;
  rol: string = "Webmaster";
  Nombre: string = "";
  email: string="";

  
  mostrarAdvertencia: boolean = true;
  mostrarConfirmacion: boolean = false;


  constructor(private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService) { }


    ngOnInit(): void {
      throw new Error('Method not implemented.');
    }
    cerrarAdvertencia(): void {
      this.mostrarAdvertencia = false;
    }
    // Confirmación de creación de usuario más bonita
    //advertenciaConfirmacion(): void{
    //  this.mostrarConfirmacion= !this.mostrarConfirmacion;
    //}
  
  

    

    addUser() {

      // Validamos que el usuario ingrese valores
      if (this.rut == '' || this.password == '' || this.confirmPassword == '') {
        alert('Todos los campos son obligatorios');
        return;
      }
  
      // Validamos que las password sean iguales
      if (this.password != this.confirmPassword) {
        alert('Las passwords ingresadas son distintas');
        return;
      }
  
      const user: User = {
        rut: this.rut,
        password: this.password,
        rol: this.rol,
        nombre: this.Nombre,
        estado:"inactivo",
        email: this.email
      }
      this.loading = true;
      this._userService.signIn(user).subscribe({
        next: (v) => {
          this.loading = false;
          alert(`El usuario ${this.rut} fue registrado con éxito`);
          this.router.navigate(['/crear-webmaster']);
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false;
          this._errorService.msjError(e);
        }
      })
    }
}
