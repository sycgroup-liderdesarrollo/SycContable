import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalconveniosComponent } from './modalconvenios.component';

describe('ModalconveniosComponent', () => {
  let component: ModalconveniosComponent;
  let fixture: ComponentFixture<ModalconveniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalconveniosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalconveniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
