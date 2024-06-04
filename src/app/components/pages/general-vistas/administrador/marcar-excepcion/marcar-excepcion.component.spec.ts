import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcarExcepcionComponent } from './marcar-excepcion.component';

describe('MarcarExcepcionComponent', () => {
  let component: MarcarExcepcionComponent;
  let fixture: ComponentFixture<MarcarExcepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcarExcepcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarcarExcepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
