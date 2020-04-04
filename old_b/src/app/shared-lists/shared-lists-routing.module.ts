import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedListsPage } from './shared-lists.page';

const routes: Routes = [
  {
    path: '',
    component: SharedListsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedListsPageRoutingModule {}
