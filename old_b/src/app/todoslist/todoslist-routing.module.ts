import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoslistPage } from './todoslist.page';

const routes: Routes = [

{
    path: 'shared-lists',
    loadChildren: () => import('../shared-lists/shared-lists.module').then(m => m.SharedListsPageModule)
},
  {
    path: '',
    component: TodoslistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),SharedModule],
  exports: [RouterModule],
})
export class TodoslistPageRoutingModule {}
