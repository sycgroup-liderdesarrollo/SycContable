import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingCovenantComponent } from './assing-covenant.component';

describe('AssingCovenantComponent', () => {
  let component: AssingCovenantComponent;
  let fixture: ComponentFixture<AssingCovenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssingCovenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssingCovenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
