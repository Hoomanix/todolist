import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareTodoPage } from './share-todo.page';

const routes: Routes = [
  {
    path: '',
    component: ShareTodoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareTodoPageRoutingModule {}
