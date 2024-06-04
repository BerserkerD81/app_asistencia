import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrMarcarAsistenciaComponent } from './qr-marcar-asistencia.component';

describe('QrMarcarAsistenciaComponent', () => {
  let component: QrMarcarAsistenciaComponent;
  let fixture: ComponentFixture<QrMarcarAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrMarcarAsistenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrMarcarAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
