import { TestBed } from '@angular/core/testing';

import { RiesgosLaboralesService } from './riesgos-laborales.service';

describe('RiesgosLaboralesService', () => {
  let service: RiesgosLaboralesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiesgosLaboralesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
