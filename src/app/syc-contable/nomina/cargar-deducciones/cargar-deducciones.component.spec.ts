import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarDeduccionesComponent } from './cargar-deducciones.component';

describe('CargarDeduccionesComponent', () => {
  let component: CargarDeduccionesComponent;
  let fixture: ComponentFixture<CargarDeduccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargarDeduccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarDeduccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
