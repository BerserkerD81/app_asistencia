import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-marcar-asistencia',
  standalone: true,
  imports: [],
  templateUrl: './qr-marcar-asistencia.component.html',
  styleUrl: './qr-marcar-asistencia.component.css'
})
export class QrMarcarAsistenciaComponent {
  constructor(    private router: Router,
  ){
    
  }
  abrirEscaneo(){

    this.router.navigate(["/qr-asistencia"])
  }
}
