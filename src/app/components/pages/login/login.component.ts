import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rut: string = '';
  password: string = '';
  loading: boolean = false;
  rol: string = '';
  nombre: string = '';
  returnUrl: string="";

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private _errorService: ErrorService
  ) { }

  ngOnInit(): void {
    // Capturar el returnUrl de los parámetros de la URL
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/general-page';
  }

  login() {
    console.log(this.rut, this.password);
    // Validamos que el usuario ingrese datos
    if (this.rut === '' || this.password === '') {
      alert('Todos los campos son obligatorios');
      return;
    }

    // Creamos el body
    const user: User = {
      rut: this.rut,
      password: this.password,
      rol: this.rol,
      nombre: this.nombre,
      estado: "activo",
      email: "test"

    };

    this.loading = true;
    this._userService.login(user).subscribe({
      next: (token: string) => {
        var temp = token.split(" ");
        this._authService.login(temp[0], temp[1]);
        // Redirigir solo si es administrador, webmaster o docente
        if (temp[1] === "Administrador" || temp[1] === "Webmaster" || temp[1] === "Docente") {
          // Redirigir a la URL original o a la página general
          this.router.navigate([this.returnUrl]);
        } 
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;
      }
    });
  }
}
