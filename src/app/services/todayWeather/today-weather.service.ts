import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {URL} from '../../constants';
import {Observable} from 'rxjs';
import {TodayWeather} from '../../model/todayWeather';
import {ApiKeyService} from '../apiKey/api-key.service';
import {catchError, tap, timeout} from 'rxjs/operators';
import {CurrentWeather} from '../../model/currentWeather';

@Injectable({
  providedIn: 'root'
})
export class TodayWeatherService {

  constructor(private apiKeyService: ApiKeyService, private http: HttpClient) {}

  getTodayWeather(city, prov, lang, units): Observable<TodayWeather> {
    const todayWeather = `${URL.TODAY}/${city}/${prov}/${lang}/units=${units}/api-key=${this.apiKeyService.apiKey}`;
    console.log(city, prov);
    return this.http.get<TodayWeather>(todayWeather).pipe(
        timeout(10000)
    );
  }

  getCurrentWeather(city, prov, lang, units): Observable<CurrentWeather> {
    const currentWeather = `${URL.CURRENT}/${city}/${prov}/${lang}/units=${units}/api-key=${this.apiKeyService.apiKey}`;
    return this.http.get<CurrentWeather>(currentWeather).pipe(
        timeout(10000)
    );
  }

}
