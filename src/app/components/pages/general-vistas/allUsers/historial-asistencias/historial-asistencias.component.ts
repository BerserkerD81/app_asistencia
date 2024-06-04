import { GeneralComponent } from '../../../general/general.component';
import { NavBarComponent } from '../../../../partials/general/nav-bar/nav-bar.component';
import { SideBarComponent } from '../../../../partials/general/side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../../../../services/attendance.service';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-historial-asistencias',
  standalone: true,
  imports: [NavBarComponent, SideBarComponent, GeneralComponent, CommonModule],
  templateUrl: './historial-asistencias.component.html',
  styleUrl: './historial-asistencias.component.css'
})
export class HistorialAsistenciasComponent implements OnInit {
  tipo: string = '';
  mostrarAdvertencia: boolean = false;
  attendanceRecords: any[] = [];
  inasistenciasSinJustificar: number = 0;

  constructor(
    private attendanceService: AttendanceService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const rut = this.authService.getRut();
    if (rut) {
      const requestData = { rut: rut }; // Ajusta esto según los requisitos de tu API
      this.fetchAttendanceRecords(requestData);
    } else {
      console.error('RUT no encontrado en el token.');
    }
  }

  fetchAttendanceRecords(data: any): void {
    this.attendanceService.getAttendanceRecords(data).subscribe(
      res => {
        this.attendanceRecords = res.data; // Ajusta según la estructura de tu respuesta
        this.checkInasistenciasSinJustificar();
      },
      err => {
        console.error('Error fetching attendance records', err);
      }
    );
  }

  checkInasistenciasSinJustificar(): void {
    this.inasistenciasSinJustificar = this.attendanceRecords.filter(record => record.estado === 'Ausente' && !record.motivo).length;
    this.mostrarAdvertencia = this.inasistenciasSinJustificar > 0;
  }

  cerrarAdvertencia(): void {
    this.mostrarAdvertencia = false;
  }
}
