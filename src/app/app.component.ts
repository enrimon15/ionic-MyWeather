import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';
import {ApiKeyService} from './services/apiKey/api-key.service';
import {Plugins} from '@capacitor/core';
import {CitySearchService} from './services/citySearch/city-search.service';
const { Device } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private apiKeyService: ApiKeyService,
    private citySearchService: CitySearchService
  ) {
    this.initializeApp();
    this.getApiKey();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initTranslate();
      this.parseCity();
    });
  }

  private initTranslate() {
      Device.getLanguageCode().then( (lang) => {
        console.log(lang);
        this.translate.setDefaultLang(lang.value.split('-')[0]);
        this.translate.use(lang.value.split('-')[0]);
      });
  }

  private getApiKey() {
    this.apiKeyService.loadApiKey();
  }

  private parseCity() {
    this.citySearchService.loadCities();
  }
}
