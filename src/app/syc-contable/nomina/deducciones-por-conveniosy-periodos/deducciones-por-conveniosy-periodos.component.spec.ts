import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeduccionesPorConveniosyPeriodosComponent } from './deducciones-por-conveniosy-periodos.component';

describe('DeduccionesPorConveniosyPeriodosComponent', () => {
  let component: DeduccionesPorConveniosyPeriodosComponent;
  let fixture: ComponentFixture<DeduccionesPorConveniosyPeriodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeduccionesPorConveniosyPeriodosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeduccionesPorConveniosyPeriodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
