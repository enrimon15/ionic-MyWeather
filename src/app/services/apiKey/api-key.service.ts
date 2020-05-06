import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiKeyService {
  apiKey: string;

  constructor() { }

  loadApiKey() {
    fetch('assets/cfg/secrets.json').then( res => res.json()).then( json => {
      console.log(json.CETEMPS_API_KEY);
      this.apiKey = json.CETEMPS_API_KEY;
    }).catch( error => console.log(error.toString()));
  }

}
