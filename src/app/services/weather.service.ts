import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  URL: string = 'https://api.openweathermap.org/data/2.5/weather?';
  
  constructor(private http: HttpClient) { }

  getCurrentWeather(lat: any, lon: any) {
    return this.http.get(`${this.URL}lat=${lat}&lang=es&lon=${lon}&units=metric&APPID=${environment.openWeatherKey}`)
    .pipe(map((resp: any) => {
      return {main: resp.main, location: resp.name, weather: resp.weather}
    }));
  }

  getCityWeather(city: string) {
    return this.http.get(`${this.URL}q=${city}&lang=es&units=metric&APPID=${environment.openWeatherKey}`)
    .pipe(map((resp: any) => {
      return {main: resp.main, location: resp.name, weather: resp.weather}
    }));
  }
}
