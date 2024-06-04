import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfGenerateService {

  constructor() { }

  public generatePdf(data: any[]): void {
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Informe de asistencias', 14, 22);
    doc.setFontSize(12);
    doc.text(`Fecha: ${today}`, 14, 30);

    // Ajustar el inicio de la tabla
    const startY = 40;

    // Extraer los headers correctamente como un array de strings
    const headers = Object.keys(data[0]);

    // Convertir los headers a un formato aceptable por autoTable
    const head = [headers.map(header => header.toUpperCase())];

    // Extraer los valores de cada objeto en el array y convertirlos a strings
  
    const body: RowInput[] = data.map(item => Object.values(item));

    autoTable(doc, {
      head: head,
      body: body,
      startY: startY, // Ajustar el inicio de la tabla
      theme: 'striped',
      headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] },
      styles: { fontSize: 8 }
    });

    doc.save(`ReporteAsistencia-${today}.pdf`);
  }
}
