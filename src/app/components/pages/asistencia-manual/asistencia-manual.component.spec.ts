import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciaManualComponent } from './asistencia-manual.component';

describe('AsistenciaManualComponent', () => {
  let component: AsistenciaManualComponent;
  let fixture: ComponentFixture<AsistenciaManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenciaManualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsistenciaManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
