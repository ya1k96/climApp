import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { LocationService } from 'src/app/services/location.service';
import { WeatherService } from 'src/app/services/weather.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  latitude: any;
  longitude: any;
  actualWeather: any;
  loading: boolean = false;
  history: any = [];
  p: number = 1;
  pageSize = 5;
  query: string = '';
  momentVar = moment; 
  constructor(private locationService: LocationService, private watherService: WeatherService) {             
  }

  ngOnInit(): void {       
    this.getLocation();
    this.loadHistory();
  }
  
  getLocation() {
    this.locationService.getPosition().then(pos => {
      this.latitude = pos.lat;
      this.longitude = pos.lng;      
    })
    .finally(() => this.getCurrentWeather());
  }
 
  getCurrentWeather() {
    this.loading = true;
    this.watherService.getCurrentWeather(this.latitude, this.longitude)
    .subscribe(resp => {
      this.actualWeather = resp;
      this.loading = false;
    });
  } 
  //load history user
  loadHistory() {
    if(!localStorage.getItem('history')) this.setHistory([]);
    let rawHistory: any = localStorage.getItem('history');

    this.history = JSON.parse(rawHistory);
  }

  saveSearch(city: string) {
    this.history.push({query: city, createdAt: Date.now()});  
    this.setHistory(this.history);
  }
  
  cleanHistory() {
    this.setHistory([]);
  }

  setHistory(historyList: any) {
    this.history = historyList;
    localStorage.setItem('history', JSON.stringify(historyList));
  }

  changePerPage(event: any) {
    this.pageSize = event.target.value;
  }

  filterHistory(event: any) {
    this.query = event.target.value;
    this.loadHistory();

    if(this.query !== '') this.history = this.history.filter((item: any) => item.query === this.query);
  }

  search(event: any) {
    let city = event.target.value;
    this.loading = true;
    this.watherService.getCityWeather(city)
    .subscribe(resp => {
      console.log(resp)
      if(!resp) Swal.fire('Ha ocurrido un error');
      this.actualWeather = resp;      
      this.loading = false;
      this.saveSearch(city);
    });
  }
}
