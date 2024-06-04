import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../interfaces/user';
import { ErrorService } from '../../../services/error.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  rut: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;
  rol: string = "Docente";
  nombre: string = "";
  email: string="";

  constructor(private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService) { }

  ngOnInit(): void {
  }

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
      nombre: this.nombre,
      estado: "activo",
      email: this.email,
    }
    this.loading = true;
    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        alert(`El usuario ${this.rut} fue registrado con éxito`);
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e);
      }
    })
  }
}
