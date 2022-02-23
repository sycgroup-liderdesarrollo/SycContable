import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCovenantComponent } from './admin-covenant.component';

describe('AdminCovenantComponent', () => {
  let component: AdminCovenantComponent;
  let fixture: ComponentFixture<AdminCovenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCovenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCovenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
