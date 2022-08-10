import { TestBed } from '@angular/core/testing';

import { InvocadorService } from './invocador.service';

describe('InvocadorService', () => {
  let service: InvocadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvocadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
