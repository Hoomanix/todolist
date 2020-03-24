import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../../../model/item';
import { TodoslistService } from '../../../services/todoslist.service';
import {List} from '../../../model/list';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.page.html',
  styleUrls: ['./addtodo.page.scss'],
})
export class AddtodoPage implements OnInit {

  title: string;

  constructor(private listService: TodoslistService,
              private router: Router) { }

  ngOnInit() {
  }

  addList() {
    const list = { title: this.title, owner : firebase.auth().currentUser.email, writers : { idWriter : firebase.auth().currentUser.email } , readers : { }} as List;
    this.listService.addList(list);
    this.router.navigate(['/todoslist']);
  }

  retourPagetodo() {
    window.history.back();
  }
}
