import { TestBed } from '@angular/core/testing';

import { EvaluarService } from './evaluar.service';

describe('EvaluarService', () => {
  let service: EvaluarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
