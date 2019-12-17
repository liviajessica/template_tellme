import { UserService } from './../../user.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from './../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private userSvc: UserService, private modalCtrl: ModalController, private authSvc: AuthService) { }

  ngOnInit() {
  }

  onSignUp(f: NgForm) {
    console.log(f.value);
    this.authSvc.signup(f.value.email, f.value.pwd).subscribe(resp => {
      console.log(resp);
      this.userSvc.setUser(resp.email, resp.localId);
      this.modalCtrl.dismiss();
    });
    // this.authSvc.signup(f.value.email, f.value.pwd).subscribe(resp => {
    //   console.log(resp);
    //   this.modalCtrl.dismiss();
    // });
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

}
