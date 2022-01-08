import { TestBed } from '@angular/core/testing';

import { AnnounceDriverService } from './announce-driver.service';

describe('AnnounceDriverService', () => {
  let service: AnnounceDriverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnounceDriverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
