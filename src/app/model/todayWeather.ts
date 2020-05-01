import {Weather} from './weather';


export class Hour {
    hour: string;
    weather: Weather;
}

export class TodayWeather {
    cityHeight: string;
    cityName: string;
    cityProvince: string;
    hours: Hour[];
}
