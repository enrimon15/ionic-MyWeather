import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.page.html',
  styleUrls: ['./drawer.page.scss'],
})
export class DrawerPage implements OnInit {
  homeTitle: string;
  favTitle: string;
  settingsTitle: string;
  infoTitle: string;

  public appPages = [];

  constructor(private translate: TranslateService, ) {
  }

  ngOnInit() {
    this.initTranslate();
  }

  async initTranslate() {
    await this.translate.get('MENU_HOME').subscribe((data: string) => {
      this.homeTitle = data;
    });
    await this.translate.get('MENU_FAVORITES').subscribe((data: string) => {
      this.favTitle = data;
    });
    await this.translate.get('MENU_SETTINGS').subscribe((data: string) => {
      this.settingsTitle = data;
    });
    await this.translate.get('MENU_INFO').subscribe((data: string) => {
      this.infoTitle = data;
    });
    this.appPages = [
      {
        title: this.homeTitle,
        url: '/drawer/tabs',
        icon: 'location-sharp'
      },
      {
        title: this.favTitle,
        url: '/drawer/favorites',
        icon: 'star-sharp'
      },
      {
        title: this.settingsTitle,
        url: '/drawer/settings',
        icon: 'settings-sharp'
      },
      {
        title: this.infoTitle,
        url: '/drawer/info',
        icon: 'information-circle-sharp'
      }
    ];
  }

}
