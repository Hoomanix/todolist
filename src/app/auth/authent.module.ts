import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Facebook } from '@ionic-native/facebook/ngx';
import { IonicModule } from '@ionic/angular';

import { AuthentPageRoutingModule } from './authent-routing.module';

import { AuthentPage } from './authent.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AuthentPageRoutingModule,
        ReactiveFormsModule
    ],
    providers: [
        Facebook
    ],

  declarations: [AuthentPage]
})
export class AuthentPageModule {}
