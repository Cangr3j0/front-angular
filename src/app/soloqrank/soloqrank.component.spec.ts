import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoloqrankComponent } from './soloqrank.component';

describe('SoloqrankComponent', () => {
  let component: SoloqrankComponent;
  let fixture: ComponentFixture<SoloqrankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoloqrankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoloqrankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
