import {Component, OnInit} from '@angular/core';
import {TodoslistService} from '../services/todoslist.service';
import {AuthService} from '../auth/auth.service';
import {Item} from '../model/item';
import {ActivatedRoute, Router} from '@angular/router';
import {FirestoreDbService} from '../services/firestore-db.service';
import {HelperService} from '../services/helper.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-todo-item',
    templateUrl: './todo-item.page.html',
  styleUrls: ['./todo-item.page.scss'],
})


export class TodoItemPage implements OnInit {
  todoId = '';
  todoDetail: any = {};
  private itemsList: Array<any> = [];

  constructor(private listService: TodoslistService, private authservice: AuthService,
              private activatedRoute: ActivatedRoute,
              private firestoreDbService: FirestoreDbService,
              private helperService: HelperService,
              private router: Router,
              private firestore: AngularFirestore,
  ) {
    this.activatedRoute.params.subscribe(result => {
      console.log('todo-item.page todoItemsId:', result.id);
      this.todoId = result.id;

      this.getItems();
    });
  }

   ngOnInit() {
  }

   getItems() {
   this.firestoreDbService.getItems(this.todoId).subscribe(result => {
      console.log('result', result);
      this.itemsList = result;
      this.todoDetail = result;
    }, (error) => {
      this.helperService.presentToast(error.message);
      console.log('in getItems ', error.message);
    });
  }


  OpenAddItemPage() {
    this.router.navigate(['/additem',this.todoId]);
  }

  /*  delete(pos: number) {
      // tslint:disable-next-line:no-shadowed-variable
      this.listService.delete(this.items[pos]);
      this.listService.get();
    }*/


  changeCheckState(item: Item) {
    console.log(item.isDone);
    /*
        this.listService.update(item);
    */

  }

}
