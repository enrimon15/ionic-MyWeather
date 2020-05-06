/* tslint:disable:object-literal-key-quotes one-line */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconUtilityService {
  iconPath = 'assets/img/icons/';
  iconPathMarker = 'assets/img/markers/';

  iconMappingIT: JSON;
  iconMappingEN: JSON;

  iconIT: any = {
    'Sereno' : 'sereno.png',
    'Soleggiato' : 'soleggiato.png',
    'Cielo Coperto' : 'cielocoperto.png',
    'Nuvoloso' : 'nuvoloso.png',
    'Pioggia' : 'pioggia.png',
    'Neve' : 'neve.png'
  };

  iconEN: any = {
    'Clear' : 'sereno.png',
    'Sunny' : 'soleggiato.png',
    'Partly Cloudy' : 'cielocoperto.png',
    'Cloudy' : 'nuvoloso.png',
    'Rain' : 'pioggia.png',
    'Snow' : 'neve.png'
  };

  constructor() {
    this.iconMappingIT = this.iconIT as JSON;
    this.iconMappingEN = this.iconEN as JSON;
  }

  selectIcon(icon: string): string {
    if (this.iconMappingIT[icon] != null && this.iconMappingIT[icon] !== undefined) {
      return this.iconPath + this.iconMappingIT[icon];
    }
    else if (this.iconMappingEN[icon] != null && this.iconMappingEN[icon] !== undefined) {
      return this.iconPath + this.iconMappingEN[icon];
    }
  }

  selectIconMarker(icon: string): string {
    const addMarker = 'marker.';
    let splitted: string[];

    if (this.iconMappingIT[icon] != null && this.iconMappingIT[icon] !== undefined) {
      splitted = this.iconMappingIT[icon].split('.');
    }
    else if (this.iconMappingEN[icon] != null && this.iconMappingIT[icon] !== undefined) {
      splitted = this.iconMappingEN[icon].split('.');
    }

    return this.iconPathMarker + splitted[0] + addMarker + splitted[1];
  }
}
