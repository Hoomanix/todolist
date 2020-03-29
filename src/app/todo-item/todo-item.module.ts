import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoItemPageRoutingModule } from './todo-item-routing.module';

import { TodoItemPage } from './todo-item.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TodoItemPageRoutingModule
    ],
    exports: [
        TodoItemPage
    ],
    declarations: [TodoItemPage]
})
export class TodoItemPageModule {}
