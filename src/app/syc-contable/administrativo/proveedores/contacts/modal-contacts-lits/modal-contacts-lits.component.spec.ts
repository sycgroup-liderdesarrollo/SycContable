import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContactsLitsComponent } from './modal-contacts-lits.component';

describe('ModalContactsLitsComponent', () => {
  let component: ModalContactsLitsComponent;
  let fixture: ComponentFixture<ModalContactsLitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalContactsLitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContactsLitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
