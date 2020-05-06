import { TestBed } from '@angular/core/testing';

import { SharedPrefsService } from './shared-prefs.service';

describe('SharedPrefsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedPrefsService = TestBed.get(SharedPrefsService);
    expect(service).toBeTruthy();
  });
});
