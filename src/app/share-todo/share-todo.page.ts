import { Component, OnInit } from '@angular/core';
import {TodoslistService} from '../services/todoslist.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-share-todo',
  templateUrl: './share-todo.page.html',
  styleUrls: ['./share-todo.page.scss'],
})
export class ShareTodoPage implements OnInit {

  constructor(private listService: TodoslistService,
              private router: Router) { }
  writer: string;
  reader: string;
  ngOnInit() {
  }

  retourPagetodo() {
    window.history.back();
  }

  addUser() {
    // tslint:disable-next-line:triple-equals
    if (this.writer.length >0 && this.reader.length > 0 && this.writer == this.reader) {
      this.listService.addUserwriter(this.listService.id, this.writer);
    } else{
      if (this.reader.length > 0) {
        this.listService.addUserReader(this.listService.id, this.reader);
      }
      if (this.writer.length > 0) {
        this.listService.addUserwriter(this.listService.id, this.writer);
      }

    }

  }
}
