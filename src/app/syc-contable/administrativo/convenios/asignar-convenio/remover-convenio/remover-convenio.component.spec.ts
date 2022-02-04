import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoverConvenioComponent } from './remover-convenio.component';

describe('RemoverConvenioComponent', () => {
  let component: RemoverConvenioComponent;
  let fixture: ComponentFixture<RemoverConvenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoverConvenioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoverConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
