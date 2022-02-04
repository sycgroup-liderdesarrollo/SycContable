import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScankbarComponent } from './scankbar.component';

describe('ScankbarComponent', () => {
  let component: ScankbarComponent;
  let fixture: ComponentFixture<ScankbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScankbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScankbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
