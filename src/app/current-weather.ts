export class CurrentWeather {
    constructor(public cityName: string,
                public temp: string,
                public icon: string,
                public weatherKind: string,
                public tempMax: string,
                public tempMin: string,
                public humidity: string,
                public pressure: string,
                public windspeed: string) {

    }
}
