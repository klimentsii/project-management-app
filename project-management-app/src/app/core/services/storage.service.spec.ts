import { TestBed } from '@angular/core/testing';

import { BrowserStorageService } from './storage.service';

describe('StorageService', () => {
  let service: BrowserStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
