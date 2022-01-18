import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarConvenioComponent } from './asignar-convenio.component';

describe('AsignarConvenioComponent', () => {
  let component: AsignarConvenioComponent;
  let fixture: ComponentFixture<AsignarConvenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarConvenioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
