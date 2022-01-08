import { TestBed } from '@angular/core/testing';

import { AnnounceClientService } from './announce-client.service';

describe('AnnounceClientService', () => {
  let service: AnnounceClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnounceClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
