import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarVacacionesComponent } from './asignar-vacaciones.component';

describe('AsignarVacacionesComponent', () => {
  let component: AsignarVacacionesComponent;
  let fixture: ComponentFixture<AsignarVacacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarVacacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarVacacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
