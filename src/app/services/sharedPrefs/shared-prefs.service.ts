import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import {prefs} from '../../constants';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SharedPrefsService {

  constructor(private translate: TranslateService) { }

  async setLang(newLang: string) {
    await Storage.set({
      key: prefs.LANGUAGE_KEY,
      value: newLang
    });
    this.translate.use(newLang);
  }

  async getLang() {
    const { value } = await Storage.get({ key: prefs.LANGUAGE_KEY });
    return value != null ? value : this.translate.currentLang;
  }

  async setUnit(newUnits: string) {
    await Storage.set({
      key: prefs.UNITS_KEY,
      value: newUnits
    });
  }

  async getUnit() {
    const { value } = await Storage.get({ key: prefs.UNITS_KEY });
    return value != null ? value : prefs.METRIC_UNITS;
  }

  async setLoc(newLoc: string) {
    await Storage.set({
      key: prefs.LOCATION_KEY,
      value: newLoc
    });
  }

  async getLoc() {
    const { value } = await Storage.get({ key: prefs.LOCATION_KEY });
    return value != null ? value : prefs.YES_LOCATION;
  }

}
