import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddEmployeesComponent } from './modal-add-employees.component';

describe('ModalAddEmployeesComponent', () => {
  let component: ModalAddEmployeesComponent;
  let fixture: ComponentFixture<ModalAddEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
