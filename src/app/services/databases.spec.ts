import { TestBed } from '@angular/core/testing';

import { Databases } from './databases';

describe('Databases', () => {
  let service: Databases;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Databases);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
