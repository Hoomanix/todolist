import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.page.html',
  styleUrls: ['./reset-pass.page.scss'],
})
export class ResetPassPage implements OnInit {

  validationsform: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';


  // tslint:disable-next-line:variable-name
  validation_messages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ]
  };
  constructor(  private formBuilder: FormBuilder, private navCtrl: NavController
  ) {

  }

  ngOnInit() {
     this.validationsform = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

    });
  }

  resetPassword(value: any): any {
    console.log(value.email);
    return firebase.auth().sendPasswordResetEmail(value.email).then(() => {
      this.successMessage = 'Consulter votre boite mail!!!'
      this.navCtrl.navigateBack('/auth');

    }).catch((err) => {
          this.errorMessage = 'Votre adresse mail est incorrect, veuillez le resaisir SVP!';
          console.log('adresse incorrecte');
    }
    );
  }

  goLoginPage(){
    this.navCtrl.navigateBack('/auth');
  }


}
