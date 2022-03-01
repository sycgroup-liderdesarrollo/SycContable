import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPayrollComponent } from './info-payroll.component';

describe('InfoPayrollComponent', () => {
  let component: InfoPayrollComponent;
  let fixture: ComponentFixture<InfoPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPayrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
