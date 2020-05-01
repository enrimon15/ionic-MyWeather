import { TestBed } from '@angular/core/testing';

import { TodayWeatherService } from './today-weather.service';

describe('TodayWeatherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodayWeatherService = TestBed.get(TodayWeatherService);
    expect(service).toBeTruthy();
  });
});
