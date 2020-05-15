import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {BehaviorSubject} from 'rxjs';
import {CityFavorite} from '../../model/cityFavorite';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite) {
    this.sqlite.create({
      name: 'favorites.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      this.database = db;
      db.executeSql('CREATE TABLE favorite_cities(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, province TEXT NOT NULL)', [])
              .then(() => {
                console.log('Executed SQL CREATE');
                this.dbReady.next(true);
              })
              .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  }


  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  loadCities() {
    return this.database.executeSql('SELECT * FROM favorite_cities', []).then(data => {
      const cities: CityFavorite[] = [];

      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          cities.push({
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            province: data.rows.item(i).province,
            condition: null,
            status: null
          });
        }
      }

      return cities;
    });
  }

  addCity(name, province) {
    const data = [name, province];
    return this.database.executeSql('INSERT INTO favorite_cities (name, province) VALUES (?, ?)', data).then(res => {
      console.log(res);
    });
  }

  getCity(id) {
    return this.database.executeSql('SELECT * FROM favorite_cities WHERE id = ?', [id]).then(data => {
      if (data.rows.length > 0) {
          return {
            id: data.rows.item(0).id,
            name: data.rows.item(0).name,
            province: data.rows.item(0).province,
            condition: null,
            status: null
          };
      } else {
        return null;
      }
    });
  }

  deleteCity(id) {
    return this.database.executeSql('DELETE FROM favorite_cities WHERE id = ?', [id]).then(res => {
      console.log(res);
    });
  }

  checkIsFavorite(cityName: string, cityProvince: string) {
    const param = [cityName, cityProvince];
    return this.database.executeSql('SELECT * FROM favorite_cities WHERE name = ? and province = ?', [param]).then(data => {
      if (data.rows.length > 0) {
        return {
          id: data.rows.item(0).id,
          name: data.rows.item(0).name,
          province: data.rows.item(0).province,
          condition: null,
          status: null
        };
      } else {
        return null;
      }
    });
  }


}
