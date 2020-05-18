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
import {AlertController} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import {PermissionType, Plugins} from '@capacitor/core';
import {SharedPrefsService} from '../../services/sharedPrefs/shared-prefs.service';
import {prefs} from '../../constants';
import {ActivatedRoute, Router} from '@angular/router';
import {DbService} from '../../services/database/db.service';
import {CitySearch} from '../../model/citySearch';
import {OpenNativeSettings} from '@ionic-native/open-native-settings/ngx';
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
  alertLocationPrefsError: string;
  alertLocationPrefsButton: string;
  alertSettingsButton: string;

  citySearched: CitySearch;
  isFavorite = false;
  favoriteChecked = false;

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
      private sharedPrefs: SharedPrefsService,
      private router: Router,
      private route: ActivatedRoute,
      private dbHelper: DbService,
      private openNativeService: OpenNativeSettings
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.citySearched = this.router.getCurrentNavigation().extras.state.citySearched;
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
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
        if (this.citySearched != null) {
          this.fetchData(this.citySearched.comune, this.citySearched.provincia);
        } else {
          this.getLocation().then((resp) => {
            const lat = resp.coords.latitude;
            const lon = resp.coords.longitude;
            this.locationService.getCity(lat, lon).subscribe((city) => {
              this.fetchData(city.city, 'NULL');
            }, (error) => this.handleError(error));
          });
      }

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
      const locationPrefs = await this.sharedPrefs.getLoc();
      if (locationPrefs === prefs.YES_LOCATION) {
        // tslint:disable-next-line:max-line-length
        // const permission = await Permissions.query({ name: PermissionType.Geolocation }); to check if the app has location permission, permission.state = 'granted' if yes

        // tslint:disable-next-line:triple-equals
        return await this.geolocation.getCurrentPosition({
            timeout: 5000, // with timeout i don't need to check if location is enable, if it isn't enable timeout ends and goes to catch
            enableHighAccuracy: true
        }).catch( err => {throw new Error('NO LOCATION PERMISSION'); });
      } else {
        throw new Error('NO LOCATION PREFS PERMISSION');
      }
    } catch (e) {
      this.handleError(e);
    }
  }

  private handleError(error) {
    console.log('init error:', error.toString());
    this.genericError = true;
    switch (error.toString()) {
      case 'Error: NO CONNECTION' : {
        this.showAlert('Oops..', this.alertConnectionError, this.alertTryButton, () => this.ionViewWillEnter(), null, null);
        break;
      }

      case 'Error: NO LOCATION PERMISSION' : {
        // tslint:disable-next-line:max-line-length
        this.showAlert('Oops..', this.alertLocationError, this.alertTryButton, () => this.ionViewWillEnter(), this.alertSettingsButton, () => this.open('location'));
        break;
      }

      case 'Error: NO LOCATION PREFS PERMISSION' : {
        // tslint:disable-next-line:max-line-length
        this.showAlert('Oops..', this.alertLocationPrefsError, this.alertTryButton, () => this.ionViewWillEnter(), this.alertLocationPrefsButton, () => this.router.navigate(['/app/settings']));
        break;
      }

      default : {
        this.showAlert('Oops..', this.alertGenericError, this.alertTryButton, () => this.ionViewWillEnter(), null, null);
      }
    }
  }

  private async fetchData(city, province) {
    const lang = await this.sharedPrefs.getLang();
    const units = await this.sharedPrefs.getUnit();

    this.todayService.getTodayWeather(city, province, lang.toUpperCase(), units).subscribe((tw) => {
      this.todayWeather = tw;
      this.getCurrentWeather();
      this.dbHelper.getDatabaseState().subscribe( (ready) => {
        if (ready) {
          this.dbHelper.checkIsFavorite(this.todayWeather.cityName, this.todayWeather.cityProvince.substring(1, 3)).then( (res) => {
            if (res) {
              this.isFavorite = true;
            }
            this.favoriteChecked = true;
          });
        }
      });
    }, (error) => this.handleError(error));

    this.nextDaysService.getNextDaysWeather(city, province, lang.toUpperCase(), units).subscribe( (ndw) => {
      this.nextDaysWeather = ndw;
    }, (error) => this.handleError(error));

    this.locationService.getCoords(city, province).subscribe( (coords) => {
      this.coords = coords;
    }, (error) => this.handleError(error));
  }

  async showAlert(title, content, firstButtonText, firstButtonOp, secondButtonText, secondButtonOp) {
    console.log(content);
    const butt = (secondButtonText != null && secondButtonOp != null)
        ? [
          {
            text: firstButtonText,
            handler: firstButtonOp
          },
          {
            text: secondButtonText,
            handler: secondButtonOp
          }
        ]
        : [
          {
            text: firstButtonText,
            handler: firstButtonOp
          }
        ];

    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: butt
    });

    await alert.present();
  }

  open(systemSetting: string) {
    this.openNativeService.open(systemSetting).then( val => {
      console.log('val: ' + val);
    }).catch( err => console.log('Open native settings error: ' + err));
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
    await this.translate.get('location_prefs_error').subscribe((data: string) => {
      this.alertLocationPrefsError = data;
    });
    await this.translate.get('location_prefs_button').subscribe((data: string) => {
      this.alertLocationPrefsButton = data;
    });
    await this.translate.get('connection_error').subscribe((data: string) => {
      this.alertConnectionError = data;
    });
    await this.translate.get('settings_button').subscribe((data: string) => {
      this.alertSettingsButton = data;
    });
  }
}
