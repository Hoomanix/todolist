import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {TodoslistService} from './services/todoslist.service';
import {AuthentPage} from './authent/authent.page';
import * as firebase from 'firebase';
import {AuthService} from './auth.service';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './services/auth.gaurd';
import {Facebook} from '@ionic-native/facebook/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import {ResetPassPage} from './reset-pass/reset-pass.page';
import {ResetPassPageModule} from './reset-pass/reset-pass.module';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { File } from '@ionic-native/file/ngx';
firebase.initializeApp(environment.firebase);

// @ts-ignore
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    SharedModule ,
   
    AngularFireStorageModule, ReactiveFormsModule, ResetPassPageModule],

  providers: [
    StatusBar,
    SplashScreen,
    TodoslistService,
    AuthService,
    AuthGuard,
    Facebook,
    Geolocation,
    NativeGeocoder,
    SpeechRecognition,
    Camera,
    File,
    GooglePlus,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
