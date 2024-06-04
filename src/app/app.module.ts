import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';

import { AppComponent } from './app.component';
import { SafePipe } from './safe.pipe';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { QrAsistenciaComponent } from './components/pages/qr-asistencia/qr-asistencia.component';
import { OkDialogComponent } from './components/partials/ok-dialog/ok-dialog.component';
import { LoadingDialogComponent } from './components/partials/loading-dialog/loading-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidarComponent } from './components/pages/validar/validar.component';
import { ErrorDialogComponent } from './components/partials/error-dialog/error-dialog.component';


@NgModule({
  imports:[ 
    MatDialogModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule, 
    NgxScannerQrcodeModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  declarations: [ AppComponent, SafePipe,QrAsistenciaComponent ,OkDialogComponent,LoadingDialogComponent,ValidarComponent,ErrorDialogComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
