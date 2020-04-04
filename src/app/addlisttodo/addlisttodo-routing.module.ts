import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddlisttodoPage } from './addlisttodo.page';

const routes: Routes = [
  {
    path: '',
    component: AddlisttodoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddlisttodoPageRoutingModule {}
