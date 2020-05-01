import { Component, OnInit } from '@angular/core';
import {NavParams} from '@ionic/angular';
import {NextFiveDaysWeather} from '../../model/nextFiveDaysWeather';
import {TodayWeather} from '../../model/todayWeather';
import {Weather} from '../../model/weather';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  nextFiveDaysWeather: NextFiveDaysWeather;
  todayWeather: TodayWeather;
  currentWeather: Weather;

  constructor(private nav: NavParams) {
    this.todayWeather = this.nav.get('todayWeather');
    this.nextFiveDaysWeather = this.nav.get('nextFiveDaysWeather');
    this.currentWeather = this.nav.get('currentWeather');
  }

  ngOnInit() {
  }

}
