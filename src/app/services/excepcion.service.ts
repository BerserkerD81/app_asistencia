import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcepcionService {

  private apiUrl = 'http://localhost:3000/excepcion'; // Reemplaza con la URL de tu servidor

  constructor(private http: HttpClient) { }

  setExcepcion(fechaInicio: string, fechaFin: string, horaInicio: string, horaFin: string): Observable<any> {
    const body = { fecha_inicio: fechaInicio, fecha_fin: fechaFin, hora_inicio: horaInicio, hora_fin: horaFin };
    return this.http.post<any>(this.apiUrl, body);
  }
}