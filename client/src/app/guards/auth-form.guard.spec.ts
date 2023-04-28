import { TestBed } from '@angular/core/testing';

import { AuthFormGuard } from './auth-form.guard';

describe('AuthFormGuard', () => {
  let guard: AuthFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
