import { UserService } from '../user.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface Todo{
  title: string;
  startDate: number;
  endDate: number;
  note: string;
  lat: number;
  lng: number;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoCollection: AngularFirestoreCollection<Todo>;
  private todos: Observable<Todo[]>;

  constructor(db: AngularFirestore, userSvc: UserService) {
    this.todoCollection = db.collection<Todo>(userSvc.getUID());

    this.todos = this.todoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getTodos(){
    return this.todos;
  }

  getTodo(id){
    return this.todoCollection.doc<Todo>(id).valueChanges();
  }

  updateTodo(todo: Todo, id: string){
    return this.todoCollection.doc(id).update(todo);
  }

  addTodo(todo: Todo){
    return this.todoCollection.add(todo);
  }

  removeTodo(id){
    return this.todoCollection.doc(id).delete();
  }
}
