import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { LoginComponent } from './components/pages/login/login.component';
import { GeneralComponent } from './components/pages/general/general.component';
import { QrAsistenciaComponent } from './components/pages/qr-asistencia/qr-asistencia.component';
import { MainComponent } from './components/pages/main/main.component';
import { GenerarReporteComponent } from './components/pages/general-vistas/administrador/generar-reporte/generar-reporte.component';
import { MarcarExcepcionComponent } from './components/pages/general-vistas/administrador/marcar-excepcion/marcar-excepcion.component';
import { ProfesoresPageComponent } from './components/pages/general-vistas/administrador/profesores-page/profesores-page.component';
import { GeneralPageComponent } from './components/pages/general-vistas/allUsers/general-page/general-page.component';
import { MarcarAsistenciaComponent } from './components/pages/general-vistas/allUsers/marcar-asistencia/marcar-asistencia.component';
import { HistorialAsistenciasComponent } from './components/pages/general-vistas/allUsers/historial-asistencias/historial-asistencias.component';
import { UploadComponent } from './components/pages/upload/upload.component';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { InasistenciasComponent } from './components/pages/general-vistas/allUsers/inasistencias/inasistencias.component';
import { ConfiguracionComponent } from './components/pages/configuracion/configuracion.component';
import { AsistenciaManualComponent } from './components/pages/asistencia-manual/asistencia-manual.component';
export const routes: Routes = [
    { path: '', component: MainComponent},
    { path: 'login', component: LoginComponent },
    { path: 'general', component: GeneralComponent, canActivate: [AuthGuard]},
    { path: 'signin', component: SignInComponent},
    { path: 'qr-asistencia', component: QrAsistenciaComponent, canActivate: [AuthGuard]},
    { path: 'generar-reporte', component: GenerarReporteComponent, canActivate: [AuthGuard] },
    { path: 'marcar-excepcion', component: MarcarExcepcionComponent, canActivate: [AuthGuard]},
    { path: 'profesores-page', component: ProfesoresPageComponent, canActivate: [AuthGuard]},
    { path: 'general-page', component: GeneralPageComponent, canActivate: [AuthGuard]},
    { path: 'marcar-asistencia', component: MarcarAsistenciaComponent, canActivate: [AuthGuard]},
    { path: 'historial-asistencia', component: HistorialAsistenciasComponent, canActivate: [AuthGuard]},
    { path: 'upload',component:UploadComponent,  canActivate: [AuthGuard]},
    { path: 'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuard]},
    { path: 'inasistencias', component: InasistenciasComponent,  canActivate: [AuthGuard]},
    { path: 'asistencia-manual', component: AsistenciaManualComponent}

];
export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(routes);
