/* tslint:disable:prefer-const */
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavParams, Platform} from '@ionic/angular';
import {NextFiveDaysWeather} from '../../model/nextFiveDaysWeather';
import {TodayWeather} from '../../model/todayWeather';
import {Weather} from '../../model/weather';
import {IconUtilityService} from '../../services/iconUtility/icon-utility.service';
import { Chart } from 'chart.js';
import {TranslateService} from '@ngx-translate/core';
import {CityFavorite} from '../../model/cityFavorite';
import {DbService} from '../../services/database/db.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  nextFiveDaysWeather: NextFiveDaysWeather;
  todayWeather: TodayWeather;
  currentWeather: Weather;
  isFavorite: boolean;
  currentCity: CityFavorite;
  minmax: Map<string, string>;
  FABcolor: string;
  devWidth: number;
  arrowIcon: string;

  @ViewChild('barCanvas', {static: false}) barCanvas: ElementRef;
  private barChart: Chart;
  private chartLabel: string;

  itemExpanded: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(private nav: NavParams, private iconService: IconUtilityService, private platform: Platform, private translate: TranslateService, private dbHelper: DbService) {
    this.todayWeather = this.nav.get('todayWeather');
    this.nextFiveDaysWeather = this.nav.get('nextDaysWeather');
    this.currentWeather = this.nav.get('currentWeather');
    this.currentCity = this.nav.get('currentCity');
    this.isFavorite = this.nav.get('isFavorite');
    this.FABcolor = this.isFavorite ? 'star' : 'star-outline';
    this.devWidth = this.platform.width();
    this.itemExpanded = false;
    this.arrowIcon = 'down-arrow.png';
    this.minmax = this.getMinMax();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.initTranslate();
  }

  ionViewDidEnter() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: [
          this.nextFiveDaysWeather.days[0].day.substring(0, 3).toUpperCase(),
          this.nextFiveDaysWeather.days[1].day.substring(0, 3).toUpperCase(),
          this.nextFiveDaysWeather.days[2].day.substring(0, 3).toUpperCase(),
          this.nextFiveDaysWeather.days[3].day.substring(0, 3).toUpperCase(),
          this.nextFiveDaysWeather.days[4].day.substring(0, 3).toUpperCase()
        ],
        datasets: [
          {
            label: this.chartLabel,
            data: [
              +this.nextFiveDaysWeather.days[0].weather.temperature.split(' ')[0],
              +this.nextFiveDaysWeather.days[1].weather.temperature.split(' ')[0],
              +this.nextFiveDaysWeather.days[2].weather.temperature.split(' ')[0],
              +this.nextFiveDaysWeather.days[3].weather.temperature.split(' ')[0],
              +this.nextFiveDaysWeather.days[4].weather.temperature.split(' ')[0]
            ],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  getMinMax(): Map<string, string> {
    let result: Map<string, string> = new Map<string, string>();
    let tempValues: number[] = [];
    this.todayWeather.hours.forEach( (hour) => {
      tempValues.push(+hour.weather.temperature.split(' ')[0]);
    });
    const max = Math.max(...tempValues);
    const min = Math.min(...tempValues);
    console.log(tempValues, min, max);
    result.set('min', min.toString());
    result.set('max', max.toString());
    console.log(result);
    return result;
  }

  handleFABClick() {
    this.dbHelper.getDatabaseState().subscribe( (ready) => {
      if (ready) {
        if (this.isFavorite === true) {
          // tslint:disable-next-line:no-unused-expression
          this.FABcolor === 'star-outline';
          this.dbHelper.deleteCity(this.currentCity.id);
        } else {
          // tslint:disable-next-line:no-unused-expression
          this.FABcolor === 'star';
          this.dbHelper.addCity(this.currentCity.name, this.currentCity.province);
        }
      }
    });
  }

  expandItem(itemExpanded): void {
    console.log('click expand');
    if (itemExpanded) {
      this.itemExpanded = false;
      this.arrowIcon = 'down-arrow.png';
    } else {
      this.itemExpanded = true;
      this.arrowIcon = 'up-arrow.png';
    }
  }

  private initTranslate() {
    this.translate.get('details_temperature').subscribe((data: string) => {
      this.chartLabel = data;
    });
  }
}
