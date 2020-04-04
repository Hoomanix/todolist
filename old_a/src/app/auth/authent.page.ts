import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {AuthService} from './auth.service';
import {NavController} from '@ionic/angular';
import {LOGIN} from '../constants/formValidationMessage';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {HelperService} from '../services/helper.service';


@Component({
    selector: 'app-authent',
    templateUrl: './authent.page.html',
    styleUrls: ['./authent.page.scss'],
})
export class AuthentPage implements OnInit {
    googleAuthProvider: auth.GoogleAuthProvider;
    showLoginSpinner = false;
    loginForm: FormGroup;
    email: FormControl;
    password: FormControl;
    formError: any = {
        email: '',
        password: ''
    };
    validationMessage: any = LOGIN;

    constructor(
        private facebook: Facebook,
        private angularFireAuth: AngularFireAuth,
        private navCtrl: NavController,
        private authService: AuthService,
        private helperService: HelperService
    ) {
    }

    ngOnInit() {
        this.createFormControl();
        this.createForm();

    }

    createForm() {
        this.loginForm = new FormGroup({
            email: this.email,
            password: this.password
        });
        this.loginForm.valueChanges.subscribe(data => this.onFormValueChanged(data));

    }

    onFormValueChanged(data) {
        this.formError = HelperService.prepareValidationMessage(this.loginForm, this.validationMessage, this.formError);
    }

    createFormControl() {
        this.email = new FormControl('', [
            Validators.required,
            Validators.email
        ]);
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(5)
        ]);
    }

    async loginWithEmailPassword(value) {
        this.showLoginSpinner = true;
        this.authService.loginWithEmailPassword(value)
            .then((res) => {
                if (res.user.emailVerified !== true) {
                    this.angularFireAuth.auth.currentUser.sendEmailVerification();
                    this.authService.isAuthenticated = false;

                } else {
                    this.authService.isAuthenticated = true;
                    this.showLoginSpinner = false;
                    this.helperService.presentToast('Login Success!');
                    this.resetForm();
                    this.navCtrl.navigateForward('/tasks');
                }
                this.email = value.email;
            }, err => {
                console.log('Error', err);
                if (err.code === 'auth/user-not-found') {
                    this.helperService.presentToast('There is no user record corresponding to this identifier');

                }
            });
    }

    goToSignupPage() {
        this.navCtrl.navigateForward('/register');
    }

    googleLogin() {
        this.googleAuthProvider = new auth.GoogleAuthProvider();
        this.authService.isAuthenticated = false;
        this.angularFireAuth.auth.signInWithPopup(this.googleAuthProvider).then((r) => {
            this.authService.isAuthenticated = true;
            this.navCtrl.navigateForward('/tasks');
        });

    }

    resetPassword(value: any): any {
        this.navCtrl.navigateForward('/reset-pass');
    }

    facebookLogin() {

        this.facebook.login(['public_profile', 'user_friends', 'email'])
            .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
            .catch(e => console.log('Error logging into Facebook', e));
        this.facebook.logEvent(this.facebook.EVENTS.EVENT_NAME_ADDED_TO_CART);
    }

    resetForm() {
        this.loginForm.reset();
        this.formError = {
            email: '',
            password: ''
        };
    }


}
