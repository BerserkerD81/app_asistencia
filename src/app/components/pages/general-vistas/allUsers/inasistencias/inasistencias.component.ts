import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../../../partials/general/nav-bar/nav-bar.component';
import { SideBarComponent } from '../../../../partials/general/side-bar/side-bar.component';
import { GeneralComponent } from '../../../general/general.component';
import { FormsModule } from '@angular/forms';
import { AttendanceService } from '../../../../../services/attendance.service';
import { AuthService } from '../../../../../services/auth.service';


@Component({
  selector: 'app-inasistencias',
  standalone: true,
  imports: [NavBarComponent, SideBarComponent, GeneralComponent, CommonModule, FormsModule],
  templateUrl: './inasistencias.component.html',
  styleUrls: ['./inasistencias.component.css']
})
export class InasistenciasComponent implements OnInit {
  showPopup = false;
  formData: any = {
    fecha: '',
    hora_inicio: '',
    hora_fin: '',
    curso_nombre: '',
    sala: '',
    motivo: '',
    id: ''
  };
  attendanceRecords: any[] = [];

  constructor(private http: HttpClient, private attendanceService: AttendanceService, private authService: AuthService) {}

  ngOnInit(): void {
    const rut = this.authService.getRut();
    if (rut) {
      const requestData = { rut: rut };
      this.fetchAttendanceRecords(requestData);
    } else {
      console.error('RUT no encontrado en el token.');
    }
  }

  fetchAttendanceRecords(data: any): void {
    this.attendanceService.getAttendanceRecords(data).subscribe(
      res => {
        this.attendanceRecords = res.data.filter((record: { estado: string; motivo: any; }) => record.estado === 'Ausente' && !record.motivo);
      },
      err => {
        console.error('Error fetching attendance records', err);
      }
    );
  }

  togglePopup(record?: any): void {
    if (record) {
      this.formData = {
        fecha: record.fecha,
        hora_inicio: record.hora_inicio,
        hora_fin: record.hora_fin,
        curso_nombre: record.curso_nombre,
        sala: record.sala,
        motivo: '',
        id: record.id
      };
    }
    this.showPopup = !this.showPopup;
  }

  enviarDatos(): void {
    const headers = { 'Content-Type': 'application/json' };
    const data = JSON.stringify({
      id: this.formData.id,
      motivo: this.formData.motivo
    });
    
    this.http.post<any>('http://localhost:3000/justify', data, { headers }).subscribe(
      res => {
        console.log(res);
        alert('Datos guardados exitosamente!');
        this.showPopup = false;
        // Actualizar la lista de inasistencias
        const rut = this.authService.getRut();
        if (rut) {
          const requestData = { rut: rut };
          this.fetchAttendanceRecords(requestData);
        }
      },
      err => {
        console.error(err);
        alert('Error al guardar los datos!');
      }
    );
  }
}