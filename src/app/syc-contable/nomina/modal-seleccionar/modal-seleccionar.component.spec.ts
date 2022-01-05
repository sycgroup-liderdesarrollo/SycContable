import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSeleccionarComponent } from './modal-seleccionar.component';

describe('ModalSeleccionarComponent', () => {
  let component: ModalSeleccionarComponent;
  let fixture: ComponentFixture<ModalSeleccionarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSeleccionarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSeleccionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
