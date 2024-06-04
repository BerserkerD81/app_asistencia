import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  jsonData: any[];

  constructor(private http: HttpClient) {
    this.jsonData = [];
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.parseExcelToJson(file);
  }

  parseExcelToJson(file: File) {
    if (!file) {
      alert('Please select a file!');
      return;
    }
  
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      // Convertir la hoja de cálculo a JSON
      let jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: true });

      // Convertir todos los datos a cadenas de texto excepto las horas
      const headers: string[] = jsonData[0];
      const horaInicioIndex = headers.indexOf('HORA INICIO');
      const horaFinIndex = headers.indexOf('HORA FIN');

      jsonData = jsonData.map((row, rowIndex) => {
        return row.map((cell: any, colIndex: number) => {
          if (rowIndex === 0 || colIndex === horaInicioIndex || colIndex === horaFinIndex) {
            // No convertir el encabezado y las columnas de hora a cadenas de texto
            return cell;
          }
          return cell !== null && cell !== undefined ? cell.toString() : '';
        });
      });

      // Convertir las horas de valores decimales a formato HH:mm:ss
      jsonData = jsonData.map((row, rowIndex) => {
        if (rowIndex > 0) { // Omitir la fila de encabezado
          if (horaInicioIndex !== -1 && row[horaInicioIndex] !== null && row[horaInicioIndex] !== undefined) {
            row[horaInicioIndex] = this.convertExcelTimeToTimeString(row[horaInicioIndex]);
          }
          if (horaFinIndex !== -1 && row[horaFinIndex] !== null && row[horaFinIndex] !== undefined) {
            row[horaFinIndex] = this.convertExcelTimeToTimeString(row[horaFinIndex]);
          }
        }
        return row;
      });

      // Renombrar columnas duplicadas
      const headerCounts: { [key: string]: number } = {};
      for (let i = 0; i < headers.length; i++) {
        const header = headers[i];
        if (headerCounts[header]) {
          headers[i] = `${header}.${headerCounts[header]}`;
          headerCounts[header]++;
        } else {
          headerCounts[header] = 1;
        }
      }
  
      // Actualizar jsonData con los nombres de las columnas modificadas
      jsonData[0] = headers;
  
      this.jsonData = jsonData;
    };
    fileReader.readAsArrayBuffer(file);
  }

  convertExcelTimeToTimeString(excelTime: number): string {
    const totalSeconds = Math.round(excelTime * 24 * 60 * 60);
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  saveDataToBackend() {
    if (!this.jsonData || this.jsonData.length === 0) {
      alert('No data to save!');
      return;
    }

    let headers = this.jsonData[0];
    let data = this.jsonData.slice(1);

    this.http.post<any>('http://localhost:3000/upload', { headers, data }).subscribe(
      (res) => {
        console.log(res);
        alert('Data saved successfully!');
      },
      (err) => {
        console.error(err);
        alert('Error saving data!');
      }
    );
  }
}
