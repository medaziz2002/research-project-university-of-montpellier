import { TestBed } from '@angular/core/testing';

import { NonDisponibilitéService } from './non-disponibilité.service';

describe('NonDisponibilitéService', () => {
  let service: NonDisponibilitéService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonDisponibilitéService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
