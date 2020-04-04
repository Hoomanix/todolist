import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';

import { MenuController, Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  errorMessage = '';
  photo : any; 
  constructor(
    private navCtrl : NavController,
    private menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authservice: AuthService,
    private router: Router) {
    this.initializeApp();
    this.photo ='../assets/HTMLIonAvatarElement.png';

}

initializeApp() {
    this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
    });
}

onLogout() {
  this.authservice.logoutUser()
  .then(res => {
      this.authservice.authenticated = false;
      console.log('byebye');
      console.log(res);
      this.errorMessage = '';
      this.navCtrl.navigateForward('');
  }, err => {
      this.errorMessage = err.message;
  });

}
}
