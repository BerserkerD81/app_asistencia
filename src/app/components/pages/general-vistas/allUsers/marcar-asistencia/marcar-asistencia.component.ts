import { Component } from '@angular/core';
import { GeneralComponent } from '../../../general/general.component';
import { NavBarComponent } from '../../../../partials/general/nav-bar/nav-bar.component';
import { SideBarComponent } from '../../../../partials/general/side-bar/side-bar.component';
import { QrMarcarAsistenciaComponent } from '../../../../../partials/allUsers/marcar-asistencia/qr-marcar-asistencia/qr-marcar-asistencia.component';
import { MarcarAsistenciaManualComponent } from '../../../../../partials/allUsers/marcar-asistencia/marcar-asistencia-manual/marcar-asistencia-manual.component';

@Component({
  selector: 'app-marcar-asistencia',
  standalone: true,
  imports: [NavBarComponent,SideBarComponent,GeneralComponent,QrMarcarAsistenciaComponent,MarcarAsistenciaManualComponent],
  templateUrl: './marcar-asistencia.component.html',
  styleUrl: './marcar-asistencia.component.css'
})
export class MarcarAsistenciaComponent {
  tipo: string = '';
}
