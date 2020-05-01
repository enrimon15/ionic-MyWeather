import {Weather} from './weather';


export class Day {
    day: string;
    weather: Weather;
}

export class NextFiveDaysWeather {
    cityHeight: string;
    cityName: string;
    cityProvince: string;
    days: Day[];
}
