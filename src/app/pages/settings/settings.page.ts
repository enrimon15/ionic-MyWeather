import { Component, OnInit } from '@angular/core';
import {SharedPrefsService} from '../../services/sharedPrefs/shared-prefs.service';
import {prefs} from '../../constants';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  lang: string;
  location: boolean;
  units: string;
  headerLang: string;
  headerUnit: string;

  constructor(private prefsService: SharedPrefsService, private translate: TranslateService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getPrefs();
  }

  private async getPrefs() {
    await this.translate.get('settings_language').subscribe((data: string) => {
      this.headerLang = data;
    });
    await this.translate.get('settings_units').subscribe((data: string) => {
      this.headerUnit = data;
    });

    this.lang = await this.prefsService.getLang();
    const locationString = await this.prefsService.getLoc();
    this.location = locationString === prefs.YES_LOCATION ? true : false;
    this.units = await this.prefsService.getUnit();
  }

  private async setLocationValue() {
    const newLoc = this.location ? prefs.YES_LOCATION : prefs.NO_LOCATION;
    await this.prefsService.setLoc(newLoc);
  }

  private async setLanguageValue($event) {
    await this.prefsService.setLang($event.target.value);
  }

  private async setUnitsValue($event) {
    await this.prefsService.setUnit($event.target.value);
  }

  getUnitsDisplay(units: string): string {
    return units === prefs.METRIC_UNITS ? 'C°' : '°F';
  }

  getAlertLang(): any {
    return  {
      header: this.headerLang
    };
  }

  getAlertUnits(): any {
    return  {
      header: this.headerUnit
    };
  }

}
