import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {HelperService} from '../services/helper.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileInfo: any = {};
  constructor(private angularFireAuth: AngularFireAuth,
              private helperService:HelperService,
              private authService: AuthService,
  ) {
    this.getUserProfile()
  }

  ngOnInit() {
  }


   getUserProfile() {
     this.profileInfo = this.angularFireAuth.auth.currentUser.toJSON();
     console.log('in profile ',  this.profileInfo )
  }
   logout() {
    try {
       this.authService.logoutUser();
      this.helperService.presentToast('Logout Success');
    } catch (error) {
      console.log('Error', error);
      this.helperService.presentToast(error.message);
    }
  }
}
