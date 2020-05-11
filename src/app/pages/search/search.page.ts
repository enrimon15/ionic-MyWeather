import { Component, OnInit } from '@angular/core';
import {CitySearchService} from '../../services/citySearch/city-search.service';
import {CitySearch} from '../../model/citySearch';
import {NavController} from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  // input: string;
  citiesMatch: CitySearch[] = [];
  allCities: CitySearch[];

  constructor(private cities: CitySearchService, private router: Router) {
    this.allCities = cities.cityList;
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
  }

  handleSearch($event: any) {
    // console.log($event.detail.srcElement.value);
    // console.log(this.input);
    const val = $event.target.value;
    this.citiesMatch = [];
    if (val && val.trim() !== '') {
      this.citiesMatch = this.allCities.filter( (city) => {
        // tslint:disable-next-line:triple-equals
        return (city.comune.toLowerCase().substring(0, val.length) == val);
      });
    }
  }

  selectCity(city: CitySearch) {
    const navigationExtras: NavigationExtras = {
      state: {
        citySearched: city
      }
    };
    this.router.navigate(['/app/tabs'], navigationExtras);
  }
}
