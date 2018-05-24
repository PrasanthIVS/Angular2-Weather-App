import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { CurrentWeather } from '../current-weather';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'wa-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  location; // ->used when implementing observable
  myWeather: CurrentWeather;
  constructor(private ws: WeatherService, private route: ActivatedRoute) { }

  ngOnInit() {
     this.myWeather = this.ws.weatherNow();
     navigator.geolocation.getCurrentPosition((pos) => {
      this.location = pos.coords;
      const lat = this.location.latitude;
      const lon = this.location.longitude;
      this.ws.localWeather(lat, lon).subscribe(
        (data) => {
          console.log(data);
          // tslint:disable-next-line:max-line-length
          this.myWeather = new CurrentWeather(data.name, data.main.temp, data.weather[0].icon, data.weather[0].description,
             data.main.temp_max, data.main.temp_min, data.main.humidity, data.main.pressure, data.wind.speed);
        }
      );
    });
  }

  onSubmit(weatherForm: NgForm) {
    this.ws.anotherCityWeather(weatherForm.value.city).subscribe(
      (data) => {
        this.myWeather = new CurrentWeather(data.name, data.main.temp, data.weather[0].icon, data.weather[0].description,
          data.main.temp_max, data.main.temp_min, data.main.humidity, data.main.pressure, data.wind.speed);      }
    );
  }
}




    /*this.route.data.subscribe(
      (data: { myWeather: CurrentWeather }) => {
        this.myWeather = data.myWeather;
      }); */
