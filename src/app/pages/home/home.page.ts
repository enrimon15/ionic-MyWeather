import { Component, OnInit } from '@angular/core';
import {NavParams} from '@ionic/angular';
import {TodayWeather} from '../../model/todayWeather';
import {Weather} from '../../model/weather';
import {IconUtilityService} from '../../services/iconUtility/icon-utility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  todayWeather: TodayWeather;
  currentWeather: Weather;
  now: string;

    slideOpts = {
        slidesPerView: 5,
        freeMode: false,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        }
    };

  constructor(private nav: NavParams, private iconService: IconUtilityService) {
    this.todayWeather = this.nav.get('todayWeather');
    this.currentWeather = this.nav.get('currentWeather');
    this.now = this.nav.get('now');
  }

  ngOnInit() {
  }

  getDay(): string {
    // mapping days of week (IT)
    const dayIt = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];

    // mapping days of week (EN)
    const dayEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const now = new Date().getDay();
    let date = new Date().getDate().toString();
    date = date.length === 1 ? `0${date}` : date;
    return dayIt[now] + ' ' + date;
  }

}
