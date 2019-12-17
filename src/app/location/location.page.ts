import { Component, ViewChild, AfterContentInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { UserService } from '../user.service';
declare var google;

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit, AfterContentInit {
  
  map;
  @ViewChild('mapElement', { static: true }) mapElement;
  public isLogin =  this.userSvc.getUID();

  constructor(private router: Router, private userSvc: UserService) { }

  ngOnInit() {
    if(!this.isLogin){
      this.router.navigateByUrl('/auth');
    }
  }

  onBackForm(){
    this.router.navigateByUrl('/form-schedule');
  }

  ngAfterContentInit() : void{
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,{
        center: {lat: -6.2568530, lng: 106.6183450},
        zoom: 18
      })
  } 


}
