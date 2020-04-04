import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoItemPage } from './todo-item.page';

const routes: Routes = [
  {
    path: '',
    component: TodoItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoItemPageRoutingModule {}
