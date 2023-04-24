import { TestBed } from '@angular/core/testing';

import { PrincipioService } from './principio.service';

describe('PrincipioService', () => {
  let service: PrincipioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrincipioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
