import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthentPage } from './authent.page';

const routes: Routes = [
  {
    path: '',
    component: AuthentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthentPageRoutingModule {}
