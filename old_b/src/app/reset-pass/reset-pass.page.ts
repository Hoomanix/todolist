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
      { type: 'required', message: 'Email obligatoir.' },
      { type: 'pattern', message: 'Entrer un email valide.' }
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
      this.successMessage = 'Consultez votre boite mail!!!'
      this.navCtrl.navigateBack('/authent');

    }).catch((err) => {
          this.errorMessage = 'Votre adresse mail est incorrect, veuillez le resaisir SVP!';
          console.log('adresse incorrecte');
    }
    );
  }

  goLoginPage(){
    this.navCtrl.navigateBack('/authent');
  }


}
