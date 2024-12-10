import { TestBed } from '@angular/core/testing';

import { DbAccessServiceService } from './db-access-service.service';

describe('DbAccessServiceService', () => {
  let service: DbAccessServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbAccessServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
