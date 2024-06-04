import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrAsistenciaComponent } from './qr-asistencia.component';

describe('QrAsistenciaComponent', () => {
  let component: QrAsistenciaComponent;
  let fixture: ComponentFixture<QrAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrAsistenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
