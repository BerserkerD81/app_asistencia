import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcarAsistenciaManualComponent } from './marcar-asistencia-manual.component';

describe('MarcarAsistenciaManualComponent', () => {
  let component: MarcarAsistenciaManualComponent;
  let fixture: ComponentFixture<MarcarAsistenciaManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcarAsistenciaManualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarcarAsistenciaManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
