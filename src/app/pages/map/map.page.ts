import { Component, OnInit } from '@angular/core';
import {NavParams} from '@ionic/angular';
import {Coords} from '../../model/coords';
import {CurrentWeather} from '../../model/currentWeather';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  coords: Coords;
  currentWeather: CurrentWeather;

  constructor(private nav: NavParams) {
    this.currentWeather = this.nav.get('currentWeather');
    this.coords = this.nav.get('coords');
  }

  ngOnInit() {
  }

}
