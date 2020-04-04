import {Component, OnInit} from '@angular/core';
import {NavController, Platform, ToastController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {SIGNUP} from '../constants/formValidationMessage';
import {HelperService} from '../services/helper.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    signupForm: FormGroup;
    email: FormControl;
    password: FormControl;
    lastName: FormControl;
    firstName: FormControl;
    formError: any = {
        email: '',
        password: ''
    };
    validationMessage: any = SIGNUP;
    showSignupSpinner = false;

    constructor(
        private navCtrl: NavController,
        private authService: AuthService,
        private toastController: ToastController,
        private platform: Platform,
        private helperService: HelperService
    ) {
    }

    ngOnInit() {
        this.createFormControl();
        this.createForm();
    }

    Register(value) {
        this.showSignupSpinner = true;
        this.authService.registerWithEmailPassword(value)
            .then(res => {
                if (res !== true) {
                    this.helperService.presentToast('this user already exist!');
                    console.log('in result not true', res);
                    this.showSignupSpinner = false;
                    this.resetForm();

                } else {
                    console.log('in result', res);
                    this.showSignupSpinner = false;
                    this.helperService.presentToast('Signup Success! Verification Email Sent!');
                }
            }, err => {
                console.log('Error', err);
                this.showSignupSpinner = false;
                this.helperService.presentToast(err.message);
            });
    }

    goToLoginPage() {
        this.navCtrl.navigateBack('/auth');
    }

    createFormControl() {
        this.email = new FormControl('', [
            Validators.required,
            Validators.email
        ]);
        this.lastName = new FormControl('', [
            Validators.required,

        ]);
        this.firstName = new FormControl('', [
            Validators.required,
        ]);
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(5)
        ]);
    }

    createForm() {
        this.signupForm = new FormGroup({
            email: this.email,
            password: this.password,
            lastName: this.lastName,
            firstName: this.firstName
        });
        this.signupForm.valueChanges.subscribe(data => this.onFormValueChanged(data));

    }

    onFormValueChanged(data) {
        this.formError = HelperService.prepareValidationMessage(this.signupForm, this.validationMessage, this.formError);
    }

    resetForm() {
        this.signupForm.reset();
        this.formError = {
            email: '',
            password: ''
        };
    }


}
