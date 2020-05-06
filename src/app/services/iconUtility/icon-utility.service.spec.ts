import { TestBed } from '@angular/core/testing';

import { IconUtilityService } from './icon-utility.service';

describe('IconUtilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IconUtilityService = TestBed.get(IconUtilityService);
    expect(service).toBeTruthy();
  });
});
