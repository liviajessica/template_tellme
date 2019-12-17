import { Todo, TodoService } from './../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { PlaceService } from './place.service';

@Component({
  selector: 'app-form-schedule',
  templateUrl: './form-schedule.page.html',
  styleUrls: ['./form-schedule.page.scss'],
})
export class FormSchedulePage implements OnInit {
  address = '';

  todo: Todo = {
    title: '',
    startDate: new Date().getDate(),
    endDate: new Date().getDate(),
    note: '',
    lat: 0,
    lng: 0
  }

  constructor(
    private router: Router, 
    private todoService:TodoService,
    private navController: NavController,
    private PlaceSvc: PlaceService,
    private route: ActivatedRoute,
    private loadingController: LoadingController) { }

  todoId = null;

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if(this.todoId){
      this.loadTodo();
    }
  }

  async loadTodo(){
    const loading = await this.loadingController.create({
      message: 'Loading Todo...'
    });
    await loading.present();

    this.todoService.getTodo(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
    });
  }

  async saveTodo(){
    var lat = this.PlaceSvc.getLat();
    var lng = this.PlaceSvc.getLng();
    this.todo.lat = lat;
    this.todo.lng = lng;
    if(this.todoId){
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        this.navController.navigateBack('home');
      })
    }else{
      this.todoService.addTodo(this.todo).then(() => {
        this.navController.navigateBack('home');
      });
    }
  }

  onLocation(){
    this.router.navigateByUrl('/location');
  }

  onBackHome(){
    this.router.navigateByUrl('/home');
  }

}
