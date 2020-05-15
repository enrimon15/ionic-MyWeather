import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Browser } = Plugins;

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async openURL() {
    await Browser.open({ url: 'http://cetemps.aquila.infn.it/' });
  }

}
