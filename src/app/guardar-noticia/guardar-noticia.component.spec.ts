import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarNoticiaComponent } from './guardar-noticia.component';

describe('GuardarNoticiaComponent', () => {
  let component: GuardarNoticiaComponent;
  let fixture: ComponentFixture<GuardarNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardarNoticiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardarNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
