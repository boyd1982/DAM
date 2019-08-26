import { TestBed } from '@angular/core/testing';

import { QualityService } from './quality.service';

describe('QualityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QualityService = TestBed.get(QualityService);
    expect(service).toBeTruthy();
  });
});
