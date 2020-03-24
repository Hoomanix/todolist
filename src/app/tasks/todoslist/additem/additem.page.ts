import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../../../model/item';
import { TodoslistService } from '../../../services/todoslist.service';
import {List} from '../../../model/list';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.page.html',
  styleUrls: ['./additem.page.scss'],
})
export class AdditemPage implements OnInit {
  title: string;

  constructor(private listService: TodoslistService,
              private router: Router) { }

  ngOnInit() {
  }

  addItem() {
    const item = { title: this.title, isDone : false } as Item;
    this.listService.addItem(item).then(()=>{
      this.listService.getUnsubscribe();

    });
    this.router.navigate(['/todo-item']).then(()=>{
      this.listService.getUnsubscribe();
    });
  }

  retourPagetodo() {
    window.history.back();
  }

}
