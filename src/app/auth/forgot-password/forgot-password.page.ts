import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(private userSvc: UserService, private modalCtrl: ModalController, private authSvc: AuthService) { }

  ngOnInit() {
  }

  onForgotPass(f: NgForm) {
    console.log(f.value);
    this.authSvc.forgotPassword(f.value.email).subscribe(resp => {
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
