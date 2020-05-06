import {Component, OnInit} from '@angular/core';
import {HomePage} from '../home/home.page';
import {DetailsPage} from '../details/details.page';
import {MapPage} from '../map/map.page';
import {SuperTabsConfig} from '@ionic-super-tabs/core';
import {TodayWeather} from '../../model/todayWeather';
import {TodayWeatherService} from '../../services/todayWeather/today-weather.service';
import {NextDaysWeatherService} from '../../services/nextDaysWeather/next-days-weather.service';
import {NextFiveDaysWeather} from '../../model/nextFiveDaysWeather';
import {LocationService} from '../../services/location/location.service';
import {Coords} from '../../model/coords';
import {Weather} from '../../model/weather';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import {PermissionType, Plugins} from '@capacitor/core';
import {SharedPrefsService} from '../../services/sharedPrefs/shared-prefs.service';
const { Permissions } = Plugins;
const { Network } = Plugins;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  homePage = HomePage;
  detailsPage = DetailsPage;
  mapsPage = MapPage;

  todayWeather: TodayWeather;
  nextDaysWeather: NextFiveDaysWeather;
  coords: Coords;
  currentWeather: Weather;
  nowHour: string;

  genericError = false;

  alertTryButton: string;
  alertGenericError: string;
  alertConnectionError: string;
  alertLocationError: string;

  config: SuperTabsConfig = {
    sideMenu: 'left',
    shortSwipeDuration: 180,
  };
  constructor(
      private todayService: TodayWeatherService,
      private nextDaysService: NextDaysWeatherService,
      private locationService: LocationService,
      private geolocation: Geolocation,
      private alertController: AlertController,
      private translate: TranslateService,
      private sharedPrefs: SharedPrefsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log(this.translate.currentLang);
    this.initTranslate().then(() => {
        this.getWeather();
    });
  }

  private getWeather() {
    // reset init variable
    this.genericError = false;

    Network.getStatus().then( (netStatus) => {
      console.log(netStatus);
      if (netStatus.connected) {
        // if there are nav params fetchData() otherwise get user location

        this.getLocation().then( (resp) => {
          const lat = resp.coords.latitude;
          const lon = resp.coords.longitude;
          this.locationService.getCity(lat, lon).subscribe( (city) => {
            this.fetchData(city, 'NULL');
          }, (error) => this.handleError(error));
        });

      } else {
        throw new Error('NO CONNECTION');
      }
    }, (error) => this.handleError(error));


  }

  private getCurrentWeather() {
    this.todayWeather.hours.forEach( (hour) => {
      const now = new Date().getHours().toString();
      const normalizeHour = now.length === 1 ? `0${now}:00` : `${now}:00`;
      if (hour.hour === normalizeHour) {
        this.nowHour = normalizeHour;
        this.currentWeather = hour.weather;
        return;
      }
    });
  }

  private async getLocation() {
    try {
      const permission = await Permissions.query({ name: PermissionType.Geolocation });
      console.log('Geo: ' + permission.state);
      // tslint:disable-next-line:triple-equals
      if (permission.state == 'granted') {
        return await this.geolocation.getCurrentPosition();
      } else {
        throw new Error('NO LOCATION PERMISSION');
      }
    } catch (e) {
      this.handleError(e);
    }
  }

  private handleError(error) {
    console.log(error.toString());
    this.genericError = true;
    switch (error.toString()) {
      case 'NO LOCATION PERMISSION' :
        this.showAlert('Oops..', this.alertLocationError);
        break;

      case 'NO CONNECTION' :
        this.showAlert('Oops..', this.alertConnectionError);
        break;

      default :
        this.showAlert('Oops..', this.alertGenericError);
    }
  }

  private async fetchData(city, province) {
    const lang = await this.sharedPrefs.getLang();
    const units = await this.sharedPrefs.getUnit();

    this.todayService.getTodayWeather(city, province, lang.toUpperCase(), units).subscribe((tw) => {
      this.todayWeather = tw;
      console.log(this.todayWeather);
      this.getCurrentWeather();
      console.log(this.currentWeather);
    }, (error) => this.handleError(error));

    this.nextDaysService.getNextDaysWeather(city, province, lang.toUpperCase(), units).subscribe( (ndw) => {
      this.nextDaysWeather = ndw;
      console.log(this.nextDaysWeather);
    }, (error) => this.handleError(error));

    this.locationService.getCoords(city, province).subscribe( (coords) => {
      this.coords = coords;
      console.log(this.coords);
    }, (error) => this.handleError(error));
  }

  async showAlert(title, content) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: this.alertTryButton,
          handler: () => {
            this.ionViewWillEnter();
          }
        },
        {
          text: 'Impostazioni',
          handler: () => {
            console.log('settings clicked');
            // this.router.navigate(['/tabs/home/preferenze']);
          }
        }
      ]
    });

    await alert.present();
  }

  private async initTranslate() {
    await this.translate.get('try_again').subscribe((data: string) => {
      this.alertTryButton = data;
    });
    await this.translate.get('generic_error').subscribe((data: string) => {
      this.alertGenericError = data;
    });
    await this.translate.get('location_settings_error').subscribe((data: string) => {
      this.alertLocationError = data;
    });
    await this.translate.get('connection_error').subscribe((data: string) => {
      this.alertConnectionError = data;
    });
  }
}
