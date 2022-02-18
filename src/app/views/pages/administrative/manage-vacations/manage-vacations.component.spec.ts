import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVacationsComponent } from './manage-vacations.component';

describe('ManageVacationsComponent', () => {
  let component: ManageVacationsComponent;
  let fixture: ComponentFixture<ManageVacationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageVacationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageVacationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
