import { Component, OnInit } from '@angular/core';
import { GeneralComponent } from '../../../general/general.component';
import { NavBarComponent } from '../../../../partials/general/nav-bar/nav-bar.component';
import { SideBarComponent } from '../../../../partials/general/side-bar/side-bar.component';
import { TablaComponent } from '../../../../partials/common/tabla/tabla.component';
import { asistenciaService } from '../../../../../services/asistencia.service';
import { PdfGenerateService } from '../../../../../services/pdf-generate.service';
import { FormsModule, isFormControl } from '@angular/forms';
@Component({
  selector: 'app-generar-reporte',
  standalone: true,
  imports: [NavBarComponent,SideBarComponent,GeneralComponent,TablaComponent,FormsModule],
  templateUrl: './generar-reporte.component.html',
  styleUrl: './generar-reporte.component.css'
})
export class GenerarReporteComponent implements OnInit{
  myData: any[] = [];
  filterData: any[] = [];
  dropdownTimepickerButton: boolean = false;
  //FECHAS TIPO DATE
  fechainicio: String = '';
  fechafin: String = '';
  rutDocente: number|null = null;
  constructor(
    private asistencia: asistenciaService,
    private pdfGenerate: PdfGenerateService
  ) { 
    
  }
  ngOnInit(): void {
    this.asistencia.getData().subscribe((data) => {
        this.myData=this.removeFirstColumn(data);
        this.filterData = this.myData;
        ////definir fechainicio con la fecha mas antigua de la data
        //this.fechainicio = this.myData[0].fecha;
        ////definir fechafin con la fecha mas reciente de la data
        //this.fechafin = this.myData[this.myData.length-1].fecha;

        //provisorio de definición de fechas (por desorden de la base de datos)
        //definir fechas inicio y fin
        for (let i = 0; i < this.myData.length; i++) {
          if (this.fechainicio === '' || this.fechainicio > this.myData[i].fecha) {
            this.fechainicio = this.myData[i].fecha;
          }
          if (this.fechafin === '' || this.fechafin < this.myData[i].fecha) {
            this.fechafin = this.myData[i].fecha;
          }
        }
    });
    
  }
  filtrarData(){
    this.filterData = this.myData;
    console.log(this.rutDocente, this.fechainicio, this.fechafin);
    //entra el if solo si el rutDocente no es nulo, ni vacio ni undefined
    if (this.rutDocente !== null) {
      this.filterData = this.filterData.filter((data) => {
        return data.profesor_rut == this.rutDocente;
      });
    }
    if (this.fechainicio !== '' && this.fechainicio) {
      this.filterData = this.filterData.filter((data) => {
        const dateinicio = this.fechainicio;
        return data.fecha >= dateinicio;
      });
    }
    if (this.fechafin !== '' && this.fechafin) {
      this.filterData = this.filterData.filter((data) => {
        const datefin = this.fechafin;
        return data.fecha <= this.fechafin;
      });
    }
  }
  generarPdf(){
    this.pdfGenerate.generatePdf(this.filterData);
  }
  removeFirstColumn(data: any[]): any[] {
    return data.map(row => {
      if (!row) {
        console.error('Row is undefined or null');
        return {};
      }
  
      const keys = Object.keys(row);
      const newRow = { ...row };
      delete newRow[keys[0]];
      return newRow;
    });
  }
  



  


}

