import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShareTodoPageRoutingModule } from './share-todo-routing.module';

import { ShareTodoPage } from './share-todo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ShareTodoPageRoutingModule
  ],
  declarations: [ShareTodoPage]
})
export class ShareTodoPageModule {}
