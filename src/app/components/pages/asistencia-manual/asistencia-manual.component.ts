import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { asistenciaService } from '../../../services/asistencia.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../../partials/general/nav-bar/nav-bar.component';
import { SideBarComponent } from '../../partials/general/side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

interface asistencia {
  curso_nombre: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  dia: string;
  estado: string;
  motivo: string;
  profesor_rut: string;
  seccion: string;
  sala: string;

}

@Component({
  selector: 'app-asistencia-manual',
  standalone: true,
  imports: [FormsModule, NavBarComponent, SideBarComponent, CommonModule],
  templateUrl: './asistencia-manual.component.html',
  styleUrls: ['./asistencia-manual.component.css']
})
export class AsistenciaManualComponent implements OnInit {
  curso_nombre: string = '';
  fecha: string = '';
  hora_inicio: string = '';
  hora_fin: string = '';
  dia: string = '';
  estado: string = '';
  motivo: string = '';
  profesor_rut: string = 'test';
  seccion: string = '';
  selectedDia:string="";
  horasAux:boolean=false;
  public selectedCurso: any;
  public cursos: any[] = [];
  public cursosData: any[] = [];
  public selectedSeccion: any;
  public secciones: any[] = [];
  public dias: string[] = [];
  cursosDia: any[]=[];
  sala: string="provisoria";
  salas: any[]=[];

  constructor(
    private router: Router,
    private _asistService: asistenciaService,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchDataFromApi();
    this.fetchSalasFromApi()
    this.profesor_rut=this.auth.getRut();
  
    this.setTodayDate();
  }
  private setTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.fecha = `${year}-${month}-${day}`;
  }

  private fetchDataFromApi() {
    this.http.get<any[]>('http://localhost:3000/cursos').subscribe(
      (data: any) => {
        if (data && data.data) {
          this.cursosData = data.data;
          this.cursos = this.extractCourseNames(this.cursosData);
          console.log(this.cursos);
        }
      },
      (error) => {
        console.error('Error al obtener los datos del API', error);
      }
    );
  }
  private fetchSalasFromApi() {
    this.http.get<any[]>('http://localhost:3000/salas').subscribe(
      (data: any) => {
        this.salas = this.eliminarSalasRepetidas(data);
      },
      (error) => {
        alert('Error al obtener los datos del API'+error.data);
      }
    );
  }
  private eliminarSalasRepetidas(salas: any[]): any[] {
    const salasSinRepetir: any[] = [];
    const labelsVistos: string[] = [];
  
    for (const sala of salas) {
      if (!labelsVistos.includes(sala.label)) {
        salasSinRepetir.push(sala);
        labelsVistos.push(sala.label);
      }
    }
  
    return salasSinRepetir;
  }  


  private extractCourseNames(cursosData: any[]): string[] {
    const nombresSinRepetir: string[] = [];

    for (const curso of cursosData) {
      if (!nombresSinRepetir.includes(curso.nombre)) {
        nombresSinRepetir.push(curso.nombre);
      }
    }

    return nombresSinRepetir;
  }

  private extractCourseSection(cursosData: any[], Curso: string): string[] {
    const nombresSinRepetir: string[] = [];

    for (const curso of cursosData) {
      if (curso.nombre == Curso) {
        if (!nombresSinRepetir.includes(curso.seccion)) {
          nombresSinRepetir.push(curso.seccion);
        }
      }
    }

    console.log(nombresSinRepetir);
    return nombresSinRepetir;
  }

  private extractCourseDays(cursosData: any[], cursoSeleccionado: string, seccionSeleccionada: string): string[] {
    const diasSinRepetir: string[] = [];

    for (const curso of cursosData) {
        if (curso.nombre == cursoSeleccionado && curso.seccion == seccionSeleccionada) {
            if (!diasSinRepetir.includes(curso.dia)) {
                diasSinRepetir.push(curso.dia);
            }
        }
    }

    console.log('Días sin repetir para el curso y sección seleccionados:', diasSinRepetir);
    return diasSinRepetir;
}


  public onCursoSelected() {
    console.log('Curso seleccionado:', this.selectedCurso);
    this.selectedSeccion="";
    this.selectedDia="";
    this.horasAux=false;
    this.secciones = this.extractCourseSection(this.cursosData, this.selectedCurso);
  }

  public onSeccionSelected() {
    this.selectedDia="";
    this.horasAux=false;
    console.log('Sección seleccionada:', this.selectedSeccion);
    this.dias = this.extractCourseDays(this.cursosData, this.selectedCurso, this.selectedSeccion);
  }
  public onDiaSelected() {
    this.horasAux=true;
    
    console.log('Día seleccionado:', this.selectedDia);
    this.cursosDia = this.cursosData.filter(curso => curso.dia == this.selectedDia && curso.nombre == this.selectedCurso && curso.seccion==this.selectedSeccion);
  }
  
  

  asistenciaManual() {
    console.log(this.hora_fin)
    const asist: asistencia = {
      curso_nombre: this.selectedCurso,
      fecha: this.fecha,
      hora_inicio: this.hora_inicio,
      hora_fin: this.hora_fin,
      dia: this.selectedDia,
      estado: 'Presente',
      motivo: this.motivo,
      profesor_rut: this.profesor_rut,
      seccion: this.selectedSeccion,
      sala:this.sala,
    };

    this._asistService.sendData(asist).subscribe(
      (response) => {
        console.log('Datos enviados exitosamente', response);
        alert('Registro exitoso');
        this.router.navigate(['/general']);
      },
      (error) => {
        console.error('Error al enviar los datos', error);
        alert('Error al enviar los datos');
      }
    );
  }
}
