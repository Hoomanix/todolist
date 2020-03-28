import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IonicModule} from '@ionic/angular';

import {TasksPageRoutingModule} from './tasks-routing.module';

import {TasksPage} from './tasks.page';

@NgModule({
  imports: [
    CommonModule,
    TasksPageRoutingModule,
    IonicModule

  ],
  declarations: [TasksPage]
})
export class TasksPageModule {

}
