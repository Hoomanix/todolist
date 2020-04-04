import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validationsform: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email obligatoire.' },
      { type: 'pattern', message: 'Entrer un email valide.' }
    ],
    'password': [
      { type: 'required', message: 'Mot de passe obligatoire.' },
      { type: 'minlength', message: 'Mot de passe doit contenir au moins 5 caractères' }
    ]
  };

  constructor(
      private navCtrl: NavController,
      private authService: AuthService,
      private formBuilder: FormBuilder
  ) {}

  ngOnInit(){
    this.validationsform = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      firstName: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
    });
  }

  tryRegister(value){
    this.authService.registerUser(value)
        .then(res => {
          console.log(res);
          this.errorMessage = "";
          this.successMessage = "Votre compte a bien été créé. Consultez votre boite mail";
        }, err => {
          console.log(err);
          this.errorMessage = err.message;
          this.successMessage = "";
        })
  }

  goLoginPage(){
    this.navCtrl.navigateBack('/authent');
  }

}
