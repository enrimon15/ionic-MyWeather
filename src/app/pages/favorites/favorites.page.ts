import { Component, OnInit } from '@angular/core';
import {IconUtilityService} from '../../services/iconUtility/icon-utility.service';
import {DbService} from '../../services/database/db.service';
import {CityFavorite} from '../../model/cityFavorite';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  citiesFav: CityFavorite[];

  citiesFavorites = [
    {
      cityName: 'Torrebruna, CH',
      status: 'Cielo Coperto',
      temp: '6 °C'
    },
    {
      cityName: 'Vasto, CH',
      status: 'Nuvoloso',
      temp: '11 °C'
    },
    {
      cityName: 'L\'Aquila, AQ',
      status: 'Cielo Coperto',
      temp: '12 °C'
    },
    {
      cityName: 'Torrebruna, CH',
      status: 'Cielo Coperto',
      temp: '6 °C'
    },
    {
      cityName: 'Vasto, CH',
      status: 'Nuvoloso',
      temp: '11 °C'
    },
    {
      cityName: 'L\'Aquila, AQ',
      status: 'Cielo Coperto',
      temp: '12 °C'
    },
    {
      cityName: 'Torrebruna, CH',
      status: 'Cielo Coperto',
      temp: '6 °C'
    },
    {
      cityName: 'Vasto, CH',
      status: 'Nuvoloso',
      temp: '11 °C'
    },
    {
      cityName: 'L\'Aquila, AQ',
      status: 'Cielo Coperto',
      temp: '12 °C'
    }
  ];

  constructor(private iconService: IconUtilityService, private dbHelper: DbService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.dbHelper.getDatabaseState().subscribe( ready => {
      if (ready) {
        this.dbHelper.loadCities().then( (cities) => {
          this.citiesFav = cities;
        });
      }
    });
  }

}
