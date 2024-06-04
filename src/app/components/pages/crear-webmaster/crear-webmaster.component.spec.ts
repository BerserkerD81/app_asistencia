import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearWebmasterComponent } from './crear-webmaster.component';

describe('GeneralComponent', () => {
  let component: CrearWebmasterComponent;
  let fixture: ComponentFixture<CrearWebmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearWebmasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearWebmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
