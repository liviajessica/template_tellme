import { Todo, TodoService } from './../services/todo.service';
import { UserService } from './../user.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public isLogin =  this.userSvc.getUID();
  todos: Todo[];

  constructor(private alertController: AlertController, private todoSvc: TodoService, private userSvc: UserService, private router: Router, private authSvc: AuthService) {}
  
  ngOnInit(){
    console.log(this.authSvc.isAuthenticated);
    if(this.isLogin == null){
      this.router.navigateByUrl('/auth');
    }
      console.log('masuk sini');
      this.todoSvc.getTodos().subscribe(res => {
        
        this.todos = res;
      });
  }

  onForm(){
    this.router.navigateByUrl('/form-schedule');
  }

  remove(item){
    this.todoSvc.removeTodo(item.id);
  }

  async logOut() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Apakah anda yakin ingin keluar?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.authSvc.logout();
            this.router.navigateByUrl('/auth');
          }
        }
      ]
    });

    await alert.present();
  }
}
