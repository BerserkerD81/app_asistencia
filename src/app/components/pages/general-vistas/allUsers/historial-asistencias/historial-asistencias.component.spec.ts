import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialAsistenciasComponent } from './historial-asistencias.component';

describe('HistorialAsistenciasComponent', () => {
  let component: HistorialAsistenciasComponent;
  let fixture: ComponentFixture<HistorialAsistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialAsistenciasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
