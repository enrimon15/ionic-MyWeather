export const URL_BASE = 'http://192.168.1.105:3000'; // 'http://192.168.1.51:3000';

export const URL = {
    TODAY: URL_BASE + '/mock/weather/today',
    NEXT_DAYS: URL_BASE + '/mock/weather/fivedays',
    CURRENT: URL_BASE + '/mock/weather/current',
    COORDS: URL_BASE + '/mock/coords/city',
    GET_CITY: URL_BASE + '/mock/coords/getCity'
};

export const prefs = {
    LANGUAGE_KEY: 'language',
    UNITS_KEY: 'units',
    LOCATION_KEY: 'location',
    NO_LOCATION: 'false',
    YES_LOCATION: 'true',
    METRIC_UNITS: 'metric',
    IMPERIAL_UNITS: 'imperial',
    EN_LANGUAGE: 'en',
    IT_LANGUAGE: 'it'
};
