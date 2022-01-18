import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignarConvenioComponent } from './modal-asignar-convenio.component';

describe('ModalAsignarConvenioComponent', () => {
  let component: ModalAsignarConvenioComponent;
  let fixture: ComponentFixture<ModalAsignarConvenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAsignarConvenioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAsignarConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
