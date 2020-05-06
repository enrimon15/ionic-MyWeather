import { Injectable } from '@angular/core';
import {CitySearch} from '../../model/citySearch';

@Injectable({
  providedIn: 'root'
})
export class CitySearchService {
  cityList: CitySearch[];

  constructor() {}

  loadCities() {
    fetch('assets/res/italy_cities.json').then( res => res.json()).then( json => {
      this.cityList = json as CitySearch[];
    }).catch( error => console.log(error.toString()));
  }
}
