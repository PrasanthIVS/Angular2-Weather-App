import { Injectable } from '@angular/core';
import { CurrentWeather } from './current-weather';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs'; // this approach is only for rxjs v6.1.0
import { map } from 'rxjs/operators';
import {Forecast} from './forecast';

// commented code is promise approach

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // tslint:disable-next-line:max-line-length
  /*myWeather*/current: CurrentWeather = new CurrentWeather('', '', '', '', '', '', '', '', '');
  location;
  constructor(private http: Http) { }

  weatherNow() {
    return this.current;
  }


  // implementing the code with promise instead of observable to avoid the fetching of dummy data before actual data loads
  localWeather(lat: string, long: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=6bf194bc0625323dad5b038828f83faf&units=imperial`).pipe(map((response: Response) => response.json()));
}

  anotherCityWeather(city: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6bf194bc0625323dad5b038828f83faf&units=imperial`).pipe(map((response: Response) => response.json()));
  }


fiveDayForecast(city: string) {
  // tslint:disable-next-line:max-line-length
  return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=6bf194bc0625323dad5b038828f83faf&units=imperial`).pipe(map((response: Response) => response.json()));
}
}
  /*
  localWeather() {
    return new Promise ((res, rej) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.location = pos.coords;
        const lat = this.location.latitude;
        const lon = this.location.longitude;
        console.log(lat);
        // tslint:disable-next-line:max-line-length
        return this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6bf194bc0625323dad5b038828f83faf
        &units=imperial`).pipe(map((response: Response) => response.json().toPromise().then(
          (data) => {
            console.log(data);
            // tslint:disable-next-line:max-line-length
            this.myWeather = new CurrentWeather(data.name, data.main.temp, data.weather[0].icon, data.weather[0].description,
              data.main.temp_max, data.main.temp_min
              , data.main.humidity, data.main.pressure, data.wind.speed);
              res(this.myWeather);

          }

        )));
        });
    });
  }
  }*/
