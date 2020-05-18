import { Component, OnInit } from '@angular/core';
import {IconUtilityService} from '../../services/iconUtility/icon-utility.service';
import {DbService} from '../../services/database/db.service';
import {CityFavorite} from '../../model/cityFavorite';
import {SharedPrefsService} from '../../services/sharedPrefs/shared-prefs.service';
import {TodayWeatherService} from '../../services/todayWeather/today-weather.service';
import {NavigationExtras, Router} from '@angular/router';
import {CitySearch} from '../../model/citySearch';
import {AlertController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  citiesFav: CityFavorite[] = [];
  citiesSize = 0;
  isFetchCities = false;

  alertContent: string;
  alertNoButton: string;
  alertYesButton: string;
  alertTitle: string;

  // tslint:disable-next-line:max-line-length
  constructor(private iconService: IconUtilityService, private translate: TranslateService, private dbHelper: DbService, private sharedPrefs: SharedPrefsService, private todayWeather: TodayWeatherService, private router: Router, private alertController: AlertController) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.initTranslate().then( () => {
      this.dbHelper.getDatabaseState().subscribe( ready => {
        if (ready) {
          this.dbHelper.loadCities().then( (cities) => {

            // this.citiesFav = cities;
            this.citiesSize = cities.length;
            if (this.citiesSize > 0) {
              this.fetchCityData(cities);
            } else {
              this.isFetchCities = true;
            }
          });
        }
      });
    });
  }

  async fetchCityData(cities: CityFavorite[]) {
    const lang = await this.sharedPrefs.getLang();
    const units = await this.sharedPrefs.getUnit();

    cities.forEach( (city) => {
      this.todayWeather.getCurrentWeather(city.name, city.province, lang.toUpperCase(), units).subscribe( (data) => {
        const cty = {
          id: city.id,
          name: city.name,
          province: city.province,
          status: data.weather.currentStatus,
        };
        this.citiesFav.push(cty);
      });
    });

    this.isFetchCities = true;
  }

  handleClick(city: CityFavorite) {
    const cty: CitySearch = {
      comune: city.name,
      provincia: city.province
    };

    const navigationExtras: NavigationExtras = {
      state: {
        citySearched: cty
      }
    };
    this.router.navigate(['/app/tabs'], navigationExtras);
  }

  deleteCityFavorite(city: CityFavorite) {
    this.dbHelper.deleteCity(city.name, city.province).then( (res) => this.ionViewWillEnter());
  }

  async showAlert(city: CityFavorite) {
    const alert = await this.alertController.create({
      header: this.alertTitle,
      message: this.alertContent,
      buttons: [
        {
          text: this.alertNoButton,
          role: 'cancel'
        },
        {
          text: this.alertYesButton,
          handler: () => this.deleteCityFavorite(city)
        }
      ]
    });

    await alert.present();
  }

  private async initTranslate() {
    await this.translate.get('fav_no_button').subscribe((data: string) => {
      this.alertNoButton = data;
    });
    await this.translate.get('fav_yes_button').subscribe((data: string) => {
      this.alertYesButton = data;
    });
    await this.translate.get('fav_dialog_content').subscribe((data: string) => {
      this.alertContent = data;
    });
    await this.translate.get('fav_dialog_title').subscribe((data: string) => {
      this.alertTitle = data;
    });
  }
}
