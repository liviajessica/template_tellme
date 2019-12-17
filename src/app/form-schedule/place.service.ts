import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  currAddress = new BehaviorSubject<string>(``);
  private lat: number;
  private lng: number;

  constructor() { }

  getLat(){
    return this.lat;
  }

  getLng(){
    return this.lng;
  }

  setAddress(lat: number, lng:number){
    // this.currAddress.next(address);
    this.lat = lat;
    this.lng = lng;
  }
}