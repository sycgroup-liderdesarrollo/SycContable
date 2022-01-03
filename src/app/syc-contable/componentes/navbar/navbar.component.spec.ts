import { ComponentFixture, TestBed } from '@angular/core/testing';

import { navbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: navbarComponent;
  let fixture: ComponentFixture<navbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ navbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(navbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
