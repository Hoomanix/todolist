import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {List} from '../../../model/list';
import {TodoslistService} from '../../../services/todoslist.service';
import {AuthService} from '../../../auth/auth.service';
import {NavController} from '@ionic/angular';
import {Item} from '../../../model/item';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-todo-item',
    templateUrl: './todo-item.page.html',
  styleUrls: ['./todo-item.page.scss'],
})
export class TodoItemPage implements OnInit {
  @Input() id: string;
  a: string;
  validationsform: FormGroup;
  errorMessage = '';
  public items: Array<Item> = new Array<Item>();
  constructor(private listService: TodoslistService, private authservice: AuthService,  private navCtrl: NavController ,   public afDB: AngularFireDatabase

  ) {
    this.a = this.authservice.a;
  }

  ngOnInit(): void {
    this.listService.getItems().subscribe(res => {
      this.items = res;
    });
  }

  getList() {
    return this.listService.get();
  }
  // RETOUR LIST DE ITEMS


  delete(pos: number) {
    // tslint:disable-next-line:no-shadowed-variable
    this.listService.delete(this.items[pos]);
    this.listService.get();
  }


  changeCheckState(item: Item) {
    console.log(item.isDone);
    this.listService.update(item);


  }

}
