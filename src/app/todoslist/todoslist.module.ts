import { SharedListsPageModule } from './../shared-lists/shared-lists.module';
import { SharedListsPage } from './../shared-lists/shared-lists.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TodoslistPageRoutingModule } from './todoslist-routing.module';
import { TodoslistPage } from './todoslist.page';
import {TodoItemPageModule} from '../todo-item/todo-item.module';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TodoslistPageRoutingModule,
        TodoItemPageModule,
        SharedListsPageModule,
    ],
  declarations: [TodoslistPage]
})
export class TodoslistPageModule {}
