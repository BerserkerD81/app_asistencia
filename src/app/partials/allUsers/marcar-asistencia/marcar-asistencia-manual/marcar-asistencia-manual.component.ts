import { Component } from '@angular/core';

@Component({
  selector: 'app-marcar-asistencia-manual',
  standalone: true,
  imports: [],
  templateUrl: './marcar-asistencia-manual.component.html',
  styleUrl: './marcar-asistencia-manual.component.css'
})
export class MarcarAsistenciaManualComponent {
  abrirAsistenciaManual(){
    console.log('abrir asistencia Manual');
  }
}
