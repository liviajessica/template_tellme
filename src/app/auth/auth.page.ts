import { ForgotPasswordPage } from './forgot-password/forgot-password.page';
import { UserService } from '../user.service';
import { SignupPage } from './signup/signup.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private userSvc: UserService, private modalCtrl: ModalController, private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
    this.authSvc.isAuthenticate.subscribe(resp => {
      if(resp){
        console.log('user is authenticated');
        this.router.navigateByUrl('/home');
      }else{
        console.log('No User');
      }
    })
  }

  onLogin(f: NgForm) {
    this.authSvc.login(f.value.email, f.value.pwd).subscribe(resp => {
      if(resp.idToken){
        console.log(resp);
        const uid = resp.localId;
        console.log("email : " + uid);
        this.userSvc.setUser(resp.email, resp.localId);
        this.router.navigateByUrl('/home');
      }else{
        console.log('login failed');
      }
    },
    errorResp => {
      console.log(errorResp);
      console.log('login failed');
    });
  }

  async onViewRegister() {
    const modal = await this.modalCtrl.create({
      component: SignupPage
    });
    return await modal.present();
  }

  async forgotPass(){
    const modal = await this.modalCtrl.create({
      component: ForgotPasswordPage
    });
    return await modal.present();
  }

}