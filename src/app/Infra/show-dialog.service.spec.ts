import { TestBed } from '@angular/core/testing';

import { ShowDialogService } from './show-dialog.service';

describe('ShowDialogService', () => {
  let service: ShowDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
