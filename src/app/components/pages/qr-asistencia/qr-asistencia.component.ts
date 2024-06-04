import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { LoadingDialogComponent } from '../../partials/loading-dialog/loading-dialog.component';
import { OkDialogComponent } from '../../partials/ok-dialog/ok-dialog.component';

import {
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
  NgxScannerQrcodeService,
  NgxScannerQrcodeComponent,
  ScannerQRCodeSelectedFiles,
} from 'ngx-scanner-qrcode';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qr-asistencia',
  templateUrl: './qr-asistencia.component.html',
  styleUrls: ['./qr-asistencia.component.css']
})
export class QrAsistenciaComponent implements AfterViewInit {

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth
      },
    },
  };

  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  public qrCodeResult2: ScannerQRCodeSelectedFiles[] = [];

  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  public percentage = 100;
  public quality = 100;
  public selectedCurso: any;
  public cursos: any[] = [];
  public cursosData: any[] = [];
  public selectedSeccion: any;
  public secciones: any[] = [];
  public showPopup = false;
  public showCameraSelector: boolean = false;
  public provisorio: boolean = false;
  public id: string = "";

  constructor(
    private router: Router,
    private qrcode: NgxScannerQrcodeService,
    private http: HttpClient,
    private authService: AuthService,
    public dialog: MatDialog,
    private route: ActivatedRoute // Inyectar ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = (params.get('id') ?? '').replace("_", ' ');
      console.log('ID from URL:', this.id);
      if (this.id.startsWith("SALA "))
        {
          this.togglePopup(this.id);
          this.fetchDataFromApi();

        }
    });

    const rut = this.authService.getRut();
    if (rut) {
      // Tu lógica adicional
    } else {
      console.error('RUT no encontrado en el token.');
    }
  }

  ngAfterViewInit(): void {
    this.action.isReady.subscribe((res: any) => {
      // this.handle(this.action, 'start');
    });
  }

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    const scannedValue = e[0].value;
    const currentUrl = this.router.url;
    console.log(currentUrl);
    if (scannedValue.includes(currentUrl + "/SALA_")) {
      const index = scannedValue.indexOf("SALA_")
      const extractedValue = scannedValue.slice(index).replace("_"," "); 
      this.action.stop();
      this.fetchDataFromApi();
      this.togglePopup(extractedValue);
    }
    
    console.log(scannedValue);
  }

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]) => {
      const device = devices.find(f => (/back|rear|environment/gi.test(f.label)));
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    }

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }

  public onDownload(action: NgxScannerQrcodeComponent) {
    action.download().subscribe(console.log, alert);
  }

  public onSelects(files: any) {
    this.qrcode.loadFiles(files, this.percentage, this.quality).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
      this.qrCodeResult = res;
    });
  }

  public onSelects2(files: any) {
    this.qrcode.loadFilesToScan(files, this.config, this.percentage, this.quality).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
      console.log(res);
      this.qrCodeResult2 = res;
    });
  }

  public onGetConstraints() {
    const constrains = this.action.getConstraints();
    console.log(constrains);
  }

  public applyConstraints() {
    const constrains = this.action.applyConstraints({
      ...this.action.getConstraints(),
      width: 510
    });
    console.log(constrains);
  }

  public toggleCameraSelector() {
    this.showCameraSelector = !this.showCameraSelector;
  }

  public matricularse() {
    const dialogRef = this.dialog.open(LoadingDialogComponent, {
      disableClose: true
    });
  
    const cursoSeleccionado = this.selectedCurso;
    const seccionSeleccionada = this.selectedSeccion;
    const rutUsuario = this.authService.getRut(); // Obtener el RUT del usuario desde el servicio de autenticación

    if (!rutUsuario) {
      console.error('RUT no encontrado en el token.');
      dialogRef.close();
      return;
    }

    // Crear el objeto de datos que se enviará al backend
    const data = {
      rut: rutUsuario,
      nombre: cursoSeleccionado,
      seccion: seccionSeleccionada,
      provisorio: this.provisorio
    };

    // Enviar la solicitud POST al backend
    this.http.post('http://localhost:3000/asignacion', data).subscribe(
      (response) => {
        console.log('Mensaje enviado al backend:', response);
        dialogRef.close();
        const okdialogRef = this.dialog.open(OkDialogComponent, {
          disableClose: true
        });
        okdialogRef.close();
        this.router.navigate(["/profesores-page"]);
      },
      (error) => {
        console.error('Error al enviar mensaje al backend:', error);
        dialogRef.close();
      }
    );
  }

  public togglePopup(salaEscaneada: string) {
    const dialogRef = this.dialog.open(LoadingDialogComponent, {
      disableClose: true
    });

    if (salaEscaneada && salaEscaneada.startsWith("SALA ")) {
      const rutUsuario = this.authService.getRut();
  
      if (!rutUsuario) {
        console.error('RUT no encontrado en el token.');
        dialogRef.close();
        return;
      }
  
      const data = {
        rut: rutUsuario,
        sala: salaEscaneada
      };
  
      this.http.post('http://localhost:3000/asistir', data).subscribe(
        (response: any) => {
          console.log('Respuesta del backend:', response);
          dialogRef.close();
          if (!response || !response.asistencia) {
            this.showPopup = true;
          } else {
            this.showPopup = false;
            const okdialogRef = this.dialog.open(OkDialogComponent, {
              disableClose: true
            });
            okdialogRef.close();
            this.router.navigate(["/profesores-page"]);
          }
        },
        (error) => {
          console.error('Error al enviar solicitud al backend:', error);
          dialogRef.close();
          this.showPopup = true;
        }
      );
    } else {
      console.error('No se detectó una sala válida.');
      dialogRef.close();
      this.showPopup = true;
    }
  }

  public closePopup() {
    this.showPopup = false;
  }

  private fetchDataFromApi() {
    this.http.get<any[]>('http://localhost:3000/cursos').subscribe(
      (data: any) => {
        console.log('Datos obtenidos del API:', data);
        if (data && data.data) {
          this.cursosData = data.data; // Obtener los datos de los cursos
          this.cursos = this.extractCourseNames(this.cursosData); // Extraer los nombres de los cursos
          console.log(this.cursos);
        }
      },
      (error) => {
        console.error('Error al obtener los datos del API', error);
      }
    );
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

  public onCursoSelected() {
    console.log('Curso seleccionado:', this.selectedCurso);
    this.secciones = this.extractCourseSection(this.cursosData, this.selectedCurso);
  }
}
