import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Forecast } from '../forecast';
import { WeatherService } from '../weather.service';
// forecast is implemented using data driven approach


@Component({
  selector: 'wa-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }

  forecastForm: FormGroup;
  cityForecast: Forecast[] = [];
  ngOnInit() {
    this.forecastForm = new FormGroup({
      forecastCity: new FormControl('')
    });
  }

  onSubmit() {
    this.cityForecast.splice(0, this.cityForecast.length);
    this.weatherService.fiveDayForecast(this.forecastForm.value.forecastCity).subscribe(
      (data) => {
        for (let i = 0; i < data.list.length; i += 8) {
          // tslint:disable-next-line:max-line-length
          const temperory = new Forecast(data.list[i].dt_txt, data.list[i].weather[0].icon, data.list[i].main.temp_max, data.list[i].main.temp_min);
          this.cityForecast.push(temperory);
        }
      }
    );
  }
}
