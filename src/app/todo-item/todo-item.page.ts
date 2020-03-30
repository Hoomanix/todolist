import {Component, OnInit} from '@angular/core';
import {TodoslistService} from '../services/todoslist.service';
import {AuthService} from '../auth/auth.service';
import {Item} from '../model/item';
import {ActivatedRoute, Router} from '@angular/router';
import {FirestoreDbService} from '../services/firestore-db.service';
import {HelperService} from '../services/helper.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {IonItemSliding} from '@ionic/angular';

@Component({
  selector: 'app-todo-item',
    templateUrl: './todo-item.page.html',
  styleUrls: ['./todo-item.page.scss'],
})


export class TodoItemPage implements OnInit {
  todoItemsId = '';
  private itemsList: Array<any> = [];

  constructor(private listService: TodoslistService, private authservice: AuthService,
              private activatedRoute: ActivatedRoute,
              private firestoreDbService: FirestoreDbService,
              private helperService: HelperService,
              private router: Router,
  ) {
    this.activatedRoute.params.subscribe(result => {
      console.log('todo-item.page todoItemsId:', result.id);
      this.todoItemsId = result.id;

      this.getItems();
    });
  }

   ngOnInit() {
  }

   getItems() {
   this.firestoreDbService.getItems(this.todoItemsId).subscribe(result => {
      console.log('result', result);
      this.itemsList = result;
    }, (error) => {
      this.helperService.presentToast(error.message);
      console.log('in getItems ', error.message);
    });
  }


  OpenAddItemPage() {
    this.router.navigate(['/additem',this.todoItemsId]);
  }

    deleteItem(itemId: string,itemTitle:string, slidingItem: IonItemSliding) {
        this.helperService.presentAlertConfirm(
            'Delete Product',
            `Are you sure you want to delete ${itemTitle}`,
            [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: (blah) => {
                    }
                }, {
                text: 'Yes',
                handler: async () => {
                    try {
                        await this.firestoreDbService.deleteItem(itemId,this.todoItemsId);
                        this.helperService.presentToast('Todo Deleted Successfully!');
                        slidingItem.close();
                    } catch (error) {
                        this.helperService.presentToast(error.message);
                        console.log('Error in Delete Todo', error);
                    }
                }
            }
            ]
        );
    }


  changeCheckState(item: Item) {
    console.log(item.isDone);
    /*
        this.listService.update(item);
    */

  }

}
