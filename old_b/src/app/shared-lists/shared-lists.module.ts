import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedListsPageRoutingModule } from './shared-lists-routing.module';

import { SharedListsPage } from './shared-lists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedListsPageRoutingModule
  ],
  declarations: [SharedListsPage]
})
export class SharedListsPageModule {}
