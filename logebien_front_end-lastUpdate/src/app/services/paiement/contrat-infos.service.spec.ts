import { TestBed } from '@angular/core/testing';

import { ContratInfosService } from './contrat-infos.service';

describe('ContratInfosService', () => {
  let service: ContratInfosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratInfosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
