import { Injectable } from '@angular/core';
import {ApiKeyService} from '../apiKey/api-key.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URL} from '../../constants';
import {NextFiveDaysWeather} from '../../model/nextFiveDaysWeather';

@Injectable({
  providedIn: 'root'
})
export class NextDaysWeatherService {

  constructor(private apiKeyService: ApiKeyService, private http: HttpClient) { }

  getNextDaysWeather(city, prov, lang, units): Observable<NextFiveDaysWeather> {
    const nextDaysWeather = `${URL.NEXT_DAYS}/${city}/${prov}/${lang}/units=${units}/api-key=${this.apiKeyService.apiKey}`;
    return this.http.get<NextFiveDaysWeather>(nextDaysWeather);
  }
}
