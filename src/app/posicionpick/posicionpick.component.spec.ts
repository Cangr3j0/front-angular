import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosicionpickComponent } from './posicionpick.component';

describe('PosicionpickComponent', () => {
  let component: PosicionpickComponent;
  let fixture: ComponentFixture<PosicionpickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosicionpickComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosicionpickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
