import { TestBed } from '@angular/core/testing';

import { ExpertoGuard } from './experto.guard';

describe('ExpertoGuard', () => {
  let guard: ExpertoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExpertoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
