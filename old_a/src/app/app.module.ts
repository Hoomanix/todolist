import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {TodoslistService} from './services/todoslist.service';
import * as firebase from 'firebase';
import {AuthService} from './auth/auth.service';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './auth/auth.gaurd';
import {Facebook} from '@ionic-native/facebook/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import {ResetPassPageModule} from './reset-pass/reset-pass.module';
import {HelperService} from './services/helper.service';
import {Geolocation} from '@capacitor/core';
import {SharedModule} from './shared/shared.module';

firebase.initializeApp(environment.firebase);

// @ts-ignore
@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAnalyticsModule,
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        ReactiveFormsModule,
        ResetPassPageModule,
    SharedModule],

    providers: [
        StatusBar,
        SplashScreen,
        TodoslistService,
        HelperService,
        AuthService,
        AuthGuard,
        Facebook,
        Camera,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
