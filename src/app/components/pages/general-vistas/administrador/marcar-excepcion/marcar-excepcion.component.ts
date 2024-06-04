import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../../../../partials/general/nav-bar/nav-bar.component';
import { SideBarComponent } from '../../../../partials/general/side-bar/side-bar.component';
import { GeneralComponent } from '../../../general/general.component';
import { ExcepcionService } from '../../../../../services/excepcion.service';


@Component({
  selector: 'app-marcar-excepcion',
  standalone: true,
  imports: [CommonModule, FormsModule, SideBarComponent, NavBarComponent, GeneralComponent],
  templateUrl: './marcar-excepcion.component.html',
  styleUrls: ['./marcar-excepcion.component.css']
})
export class MarcarExcepcionComponent implements OnInit {
  Bloques: boolean = false;
  Confirmacion: boolean = false;
  fechaInicio: string = '';
  fechaFin: string = '';
  bloques: string[] = [];
  bloqueInicioSeleccionado: string = '';
  bloqueFinSeleccionado: string = '';


  constructor(private excepcionService: ExcepcionService) {
    this.generarBloques();
  }

  ngOnInit(): void { }

  generarBloques(): void {
    const horaInicio = 8; // Hora inicial
    const minutoInicio = 30; // Minuto inicial
    const intervaloMinutos = 70; // Intervalo en minutos (1 hora y 10 minutos)
    const cantidadBloques = 10; // Cantidad de bloques

    for (let i = 0; i < cantidadBloques; i++) {
      const hora = horaInicio + Math.floor((minutoInicio + i * intervaloMinutos) / 60);
      const minuto = (minutoInicio + i * intervaloMinutos) % 60;
      const horaFormateada = ('0' + hora).slice(-2);
      const minutoFormateado = ('0' + minuto).slice(-2);
      this.bloques.push(`${horaFormateada}:${minutoFormateado}:00`);
    }
  }

  mostrarBloques(): void {
    if (this.fechaInicio && this.fechaFin) {
      this.Bloques = true;
    } else {
      alert('Por favor, seleccione las fechas de inicio y fin.');
    }
  }

  mostrarConfirmacion(): void {
    if (this.bloqueInicioSeleccionado && this.bloqueFinSeleccionado) {
      this.Confirmacion = !this.Confirmacion;
    } else {
      alert('Por favor, seleccione los bloques de inicio y fin.');
    }
  }

  validateDates(): void {
    if (this.fechaInicio && this.fechaFin) {
      const startDate = new Date(this.fechaInicio);
      const endDate = new Date(this.fechaFin);

      if (startDate > endDate) {
        alert('La fecha de inicio no puede ser mayor que la fecha de fin.');
        this.fechaInicio = '';
        this.fechaFin = '';
      }
    }
  }
  enviar() {

    this.excepcionService.setExcepcion(this.fechaInicio, this.fechaFin, this.bloqueInicioSeleccionado, this.bloqueFinSeleccionado).subscribe(
      response => {
        console.log('Excepción enviada al servidor:', response);
        this.Confirmacion = true; // Cambia el estado de Confirmacion después de enviar la excepción
      },
      error => {
        console.error('Error al enviar la excepción:', error);
        // Manejar el error según sea necesario
      }
    );
    
  }

  validateBloques(): void {
    if (this.bloqueInicioSeleccionado && this.bloqueFinSeleccionado) {
      const inicioIndex = this.bloques.indexOf(this.bloqueInicioSeleccionado);
      const finIndex = this.bloques.indexOf(this.bloqueFinSeleccionado);

      if (inicioIndex > finIndex) {
        alert('El bloque de inicio no puede ser después del bloque de fin.');
        this.bloqueInicioSeleccionado = '';
        this.bloqueFinSeleccionado = '';
      }
    }
  }
}
