import { TestBed } from '@angular/core/testing';

import { NextDaysWeatherService } from './next-days-weather.service';

describe('NextDaysWeatherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NextDaysWeatherService = TestBed.get(NextDaysWeatherService);
    expect(service).toBeTruthy();
  });
});
