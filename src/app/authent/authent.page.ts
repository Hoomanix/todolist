import { TodoslistService } from './../services/todoslist.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {NavController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import {resolve} from '@angular-devkit/core';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';


@Component({
  selector: 'app-authent',
  templateUrl: './authent.page.html',
  styleUrls: ['./authent.page.scss'],
})
export class AuthentPage implements OnInit {
    a: string;
    gooleprovider: auth.GoogleAuthProvider;
    mail: string;
  credential: auth.OAuthCredential;
  constructor(
      private fb: Facebook,
      private afAuth: AngularFireAuth,
      private navCtrl: NavController,
      private authService: AuthService,
      private formBuilder: FormBuilder,
      private fires: AngularFirestore,
      private todolistservice: TodoslistService,
      private googlePlus: GooglePlus

  ) { }
 /* email: string;
  emailSent = false;
  error = null;
  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) {
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.router.navigate(['todoslist']);

  }
    login1() {
    this.emailSent = false;
    this.error = null;
    this.authService.signIn(this.email)
        .then(
            () => this.emailSent = true
        )
        .catch(
            error => this.error = error
        );
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  ngOnInit() {}*/

    validationsform: FormGroup;
    errorMessage = '';


    validation_messages = {
        email: [
            { type: 'required', message: 'Email obligatoire.' },
            { type: 'pattern', message: 'Entrer un email valide.' }
        ],
        password: [
            { type: 'required', message: 'Mot de passe obligatoire.' },
            { type: 'minlength', message: 'Mot de passe doit contenir au moins 5 caractères.' }
        ]
    };
    ngOnInit() {

        this.validationsform = this.formBuilder.group({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.minLength(5),
                Validators.required
            ])),
        });
    }

    loginUser(value) {
    this.authService.loginUser(value)
        .then((res) => {
                if (res.user.emailVerified !== true) {
                    this.authService.SendVerificationMail();
                    this.authService.authenticated = false;

                } else {
                    this.authService.authenticated = true;
                    console.log('bonjour');
                    console.log(res);
                    this.errorMessage = '';
                    this.navCtrl.navigateForward('/todoslist');
                }
                this.mail = value.email;
            }, err => {
          this.errorMessage = err.message;
        });
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }

  loginwithgooglee() {
        this.gooleprovider  = new auth.GoogleAuthProvider();
        this.authService.authenticated = false;
        this.afAuth.auth.signInWithPopup(this.gooleprovider).then((r) => { this.authService.authenticated = true;
                                                                           this.navCtrl.navigateForward('/todoslist');
        });

    }

    loginwithgooglle() {
      this.authService.authenticated = false;
      this.googlePlus.login({})
        .then(res =>
          {
            this.authService.authenticated = true;
            console.log(res);
          } ).then(()=>{
            console.log("navigate");
            this.navCtrl.navigateForward('/todoslist');

          })
        .catch(err => console.log('err',err));

  }


  async loginwithgoogle() {
    this.authService.authenticated = false;

    this.googlePlus.login( {
      'sha1': '78:42:c2:d6:49:d8:3a:85:31:dd:ed:31:1b:c1:b8:63:21:ce:25:64',
      'webClientId': '920900901910-7calpuag1n7nemboks5vmg16eqivluet.apps.googleusercontent.com',
      'offline': true
    })
      .then((response) => {
        const { idToken, accessToken } = response
        this.onLoginSuccess(idToken, accessToken);
      }).catch((error) => {
        console.log(error)
        alert('error:' + JSON.stringify(error))
      });
  }
  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
        .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
            .credential(accessToken);
      firebase.auth().signInWithCredential(credential)
      .then((response) => {
        console.log(response);
        this.authService.authenticated = true;
        this.todolistservice.init_fire();
                    console.log('*****', firebase.auth().currentUser.uid);
                    const userId = firebase.auth().currentUser.uid;
                    const userDoc = this.fires.doc<any>('users/' + userId);
                    userDoc.set({
                      firstName: response.user.displayName.substr(0,response.user.displayName.indexOf(' ')),
                      lastName: response.user.displayName.substr(response.user.displayName.indexOf(' ')+1),
                      email: response.user.email,
                      id : userId,
              });

        this.navCtrl.navigateForward('/todoslist');
      })

  }
  onLoginError(err) {
    console.log(err);
  }

    resetPassword(value: any): any {
        this.navCtrl.navigateForward('/reset-pass');
        /*console.log(value.email);
        return firebase.auth().sendPasswordResetEmail(value.email);*/
    }

    loginwithfacebook() {
      this.loginwithfacebook0();
       /* this.fb.login(['public_profile', 'user_friends', 'email'])
            .then((res: FacebookLoginResponse) => {
                this.authService.authenticated = true;
                console.log('res facbook connect ',res);
                this.navCtrl.navigateForward('/todoslist');
            }
                )
            .catch(e => console.log('Error  Facebook', e));
        this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);*/
    }



    async loginwithfacebook0(): Promise<void> {
        try {
          const response = await this.fb.login(["public_profile", "email"]);
    
          console.log(response);
    
          if (response.authResponse) {
            // User is signed-in Facebook.
            const unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
              unsubscribe();
              // Check if we are already signed-in Firebase with the correct user.
              if (!this.isUserEqual(response.authResponse, firebaseUser)) {
                // Build Firebase credential with the Facebook auth token.
                    this.credential = firebase.auth.FacebookAuthProvider.credential(
                  response.authResponse.accessToken
                );
                // Sign in with the credential from the Facebook user.
                firebase
                  .auth()
                  .signInWithCredential(this.credential)
                  .then(()=>{
                    console.log(this.credential);
                    this.authService.authenticated = true;
                    this.navCtrl.navigateForward('/todoslist');
                    this.todolistservice.init_fire();
                    console.log('*****', firebase.auth().currentUser.uid);
                    const userId = firebase.auth().currentUser.uid;
                    const userDoc = this.fires.doc<any>('users/' + userId);

                    this.fb.api("/me?fields=name,gender,birthday,email", []).then((user) => {

                      // Get the connected user details
                      var gender    = user.gender;
                      var birthday  = user.birthday;
                      var name      = user.name;
                      var email     = user.email;
      
                      // => Open user session and redirect to the next page
                      userDoc.set({
                            firstName: name.substr(0,name.indexOf(' ')),
                            lastName: name.substr(name.indexOf(' ')+1),
                            email: email,
                            id : userId,
                    });
      
                  });
                    /*userDoc.set({
                            firstName: value.firstName,
                            lastName: value.lastName,
                            email: value.email,
                            id : userId,
                    });*/
                  })
                  .catch(error => {
                    console.log(error,'hello facebook');
                  });
                  
              } else {
                // User is already signed-in Firebase with the correct user.
                console.log("already signed in");
              }
            });
          } else {
            // User is signed-out of Facebook.
            console.log("sign out ");
            firebase.auth().signOut();
          }
        } catch (err) {
          console.log(err ,'err');
        }
      }
      isUserEqual(facebookAuthResponse, firebaseUser): boolean {
        if (firebaseUser) {
          const providerData = firebaseUser.providerData;
    
          providerData.forEach(data => {
            if (
              data.providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
              data.uid === facebookAuthResponse.userID
            ) {
              // We don't need to re-auth the Firebase connection.
              return true;
            }
          });
        }
    
        return false;
      }
   

}
