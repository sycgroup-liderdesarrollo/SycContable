import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovenantUsersTableComponent } from './covenant-users-table.component';

describe('CovenantUsersTableComponent', () => {
  let component: CovenantUsersTableComponent;
  let fixture: ComponentFixture<CovenantUsersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovenantUsersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovenantUsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
