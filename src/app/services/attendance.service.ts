import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://localhost:3000/history'; // URL de tu API

  constructor(private http: HttpClient) { }

  getAttendanceRecords(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Agrega más encabezados si es necesario
    });

    return this.http.post<any>(this.apiUrl, data, { headers });
  }
}
