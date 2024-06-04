import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SideBarComponent } from '../../partials/general/side-bar/side-bar.component';
import { NavBarComponent } from '../../partials/general/nav-bar/nav-bar.component';
import { PanelComponent } from '../../partials/general/panel/panel.component';
import { ListenOptions } from 'net';
// imports de las vistas administrador
import { GenerarReporteComponent } from '../general-vistas/administrador/generar-reporte/generar-reporte.component';
import { MarcarExcepcionComponent } from '../general-vistas/administrador/marcar-excepcion/marcar-excepcion.component';
import { ProfesoresPageComponent } from '../general-vistas/administrador/profesores-page/profesores-page.component';
// imports de las vistas allUsers
import { GeneralPageComponent } from '../general-vistas/allUsers/general-page/general-page.component';
import { HistorialAsistenciasComponent } from '../general-vistas/allUsers/historial-asistencias/historial-asistencias.component';
import { MarcarAsistenciaComponent } from '../general-vistas/allUsers/marcar-asistencia/marcar-asistencia.component';
@Component({
  selector: 'app-general',
  standalone: true,
  imports: [SideBarComponent,NavBarComponent,PanelComponent,GenerarReporteComponent,MarcarExcepcionComponent,ProfesoresPageComponent,GeneralPageComponent,HistorialAsistenciasComponent,MarcarAsistenciaComponent],
  templateUrl: './general.component.html',
  styleUrl: './general.component.css'
})
export class GeneralComponent {
    vistasAllUsers: any[] = [GeneralPageComponent, HistorialAsistenciasComponent, MarcarAsistenciaComponent];
    vistasAdministrador: any[] = [GenerarReporteComponent, MarcarExcepcionComponent, ProfesoresPageComponent];
    constructor(
    ){
      router: Router;
    }
}
