import { Component, OnInit } from '@angular/core';
import {NavParams} from '@ionic/angular';
import {Coords} from '../../model/coords';
import { Map, latLng, tileLayer, Layer, marker, icon} from 'leaflet';
import {Weather} from '../../model/weather';
import {IconUtilityService} from '../../services/iconUtility/icon-utility.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  coords: Coords;
  currentWeather: Weather;
  cityName: string;
  cityProvince: string;
  map: Map;

  constructor(private nav: NavParams, private iconService: IconUtilityService) {
    this.currentWeather = this.nav.get('currentWeather');
    this.coords = this.nav.get('coords');
    this.cityName = this.nav.get('cityName');
    this.cityProvince = this.nav.get('cityProvince');
  }

  ngOnInit() {
  }

  ionViewDidEnter() { this.showMap(); }

  showMap() {
    this.map = new Map('mapId').setView([this.coords.lat, this.coords.lon], 13);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Enrico Monte | UNIVAQ',
    }).addTo(this.map);

    const customMarkerIcon = icon({
      iconUrl: this.iconService.selectIconMarker(this.currentWeather.status),
      iconSize: [47, 64],
      popupAnchor: [0, -20],
    });

    marker([this.coords.lat, this.coords.lon], {icon: customMarkerIcon}).addTo(this.map)
        .bindPopup(
            this.cityName + ', ' + this.cityProvince + '<br>' + this.currentWeather.temperature.split(' ')[0] + '°',
            { autoClose: false }
        )
        .openPopup();
  }

  /** Remove map when we have multiple map object */
  ionViewWillLeave() {
    this.map.remove();
  }

}
