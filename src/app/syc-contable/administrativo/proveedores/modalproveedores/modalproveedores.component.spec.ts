import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalproveedoresComponent } from './modalproveedores.component';

describe('ModalproveedoresComponent', () => {
  let component: ModalproveedoresComponent;
  let fixture: ComponentFixture<ModalproveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalproveedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalproveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
