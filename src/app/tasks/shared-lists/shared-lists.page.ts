import { Component, OnInit } from '@angular/core';
import {TodoslistService} from '../../services/todoslist.service';

@Component({
  selector: 'app-shared-lists',
  templateUrl: './shared-lists.page.html',
  styleUrls: ['./shared-lists.page.scss'],
})
export class SharedListsPage implements OnInit {

  constructor(private listService: TodoslistService) { }

  ngOnInit() {
  }
  getListReaders() {
    return this.listService.getReaders();
  }

  getListWriters() {
    return this.listService.getWriters();
  }
}
