import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddlisttodoPageRoutingModule } from './addlisttodo-routing.module';

import { AddlisttodoPage } from './addlisttodo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddlisttodoPageRoutingModule
  ],
  declarations: [AddlisttodoPage]
})
export class AddlisttodoPageModule {}
