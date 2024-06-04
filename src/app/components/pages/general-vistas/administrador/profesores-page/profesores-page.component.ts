import { Component, OnInit } from '@angular/core';
import { GeneralComponent } from '../../../general/general.component';
import { NavBarComponent } from '../../../../partials/general/nav-bar/nav-bar.component';
import { SideBarComponent } from '../../../../partials/general/side-bar/side-bar.component';
import { UserService } from '../../../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorService } from '../../../../../services/error.service';
import { User } from '../../../../../interfaces/user';
import { LoadingDialogComponent } from '../../../../partials/loading-dialog/loading-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AttendanceService } from '../../../../../services/attendance.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profesores-page',
  standalone: true,
  imports: [NavBarComponent, SideBarComponent, GeneralComponent, CommonModule,FormsModule],
  templateUrl: './profesores-page.component.html',
  styleUrls: ['./profesores-page.component.css']
})
export class ProfesoresPageComponent implements OnInit {
  loading: boolean = false;
  users: User[] = [];
  showPopup: boolean = false;
  showPopup1: boolean = false;
  attendanceRecords: any[] = [];
  searchTerm: string = ''; // Almacena el término de búsqueda
  filteredUsers: User[] = []; // Almacena la lista de usuarios filtrados
  nombre: string="";
  password: string="";
  confirmarPassword: string="";
  rol: string="";
  rut: string="";
  cambiarContrasena: boolean = false;

  constructor(
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService,
    public dialog: MatDialog,
    private attendanceService: AttendanceService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    const dialogRef = this.dialog.open(LoadingDialogComponent, {
      disableClose: true
    });

    this._userService.getUsers().subscribe({
      next: (users: User[]) => {
        dialogRef.close();
        this.users = users;
        this.printUsers();
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e);
      }
    });
  }

  printUsers(): void {
    this.filteredUsers = [...this.users]; // Inicializa filteredUsers con la lista completa de usuarios
  }

  printUserName(rut: string): void {
    const requestData = { rut: rut };
    this.fetchAttendanceRecords(requestData);
    this.showPopup = true;
  }
  
  desactivar(rut: string): void {
    this.loading = true;
    const requestData = { rut: rut };
    this._userService.desactivar(requestData).subscribe({
      next: (res: string) => {
        console.log(res);
        this.getUsers();

      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;
      }
    });
  }

  togglePopup(): void {
    this.showPopup = !this.showPopup
  }
  togglePopup1(): void {
    this.showPopup1 = !this.showPopup1
  }

  fetchAttendanceRecords(data: any): void {
    const dialogRef = this.dialog.open(LoadingDialogComponent, {
      disableClose: true
    });
    this.attendanceService.getAttendanceRecords(data).subscribe(
      res => {
        this.attendanceRecords = res.data;
        dialogRef.close();
      },
      err => {
        dialogRef.close();
        alert('Error fetching attendance records');
      }
    );
  }

  filterUsers(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredUsers = [...this.users]; // Si no hay término de búsqueda, mostrar todos los usuarios
    } else {
      this.filteredUsers = this.users.filter(user => {
        return user.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.rut.includes(this.searchTerm);
      });
    }
  }
  configurar(rut:string, nombre:string)
  {
    this.showPopup1=true;
    this.rut=rut;
    this.nombre=nombre;
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
