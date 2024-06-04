import { TestBed } from '@angular/core/testing';

import { ExcepcionService } from './excepcion.service';

describe('ExcepcionService', () => {
  let service: ExcepcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcepcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
