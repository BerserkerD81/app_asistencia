import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class asistenciaService {
  
    private apiUrl = 'http://localhost:3000/asistencia';  // URL del backend  // URL del backend
  
    constructor(private http: HttpClient) { }
  
    sendData(data: any): Observable<any> {
      //console.log("OK")
      return this.http.post<any>(this.apiUrl, data);
    }
    getData(): Observable<any> {
      //console.log("OK")
      return this.http.get<any>(this.apiUrl+"/getAsistencia");
    }

  }