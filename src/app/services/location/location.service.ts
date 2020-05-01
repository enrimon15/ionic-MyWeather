import { Injectable } from '@angular/core';
import {ApiKeyService} from '../apiKey/api-key.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URL} from '../../constants';
import {Coords} from '../../model/coords';
import {City} from '../../model/city';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private apiKeyService: ApiKeyService, private http: HttpClient) {}

  getCoords(city, prov): Observable<Coords> {
    const coords = `${URL.COORDS}/${city}/${prov}/api-key=${this.apiKeyService.apiKey}`;
    return this.http.get<Coords>(coords);
  }

  getCity(lat, lon): Observable<City> {
    const city = `${URL.GET_CITY}/${lat}/${lon}/api-key=${this.apiKeyService.apiKey}`;
    return this.http.get<City>(city);
  }
}
