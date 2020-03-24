import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {TodoslistService} from '../services/todoslist.service';
import {HelperService} from '../services/helper.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public isAuthenticated = true;
    email: string;

    constructor(private angularFireAuth: AngularFireAuth,
                private router: Router,
                private angularFirestore: AngularFirestore,
                private todolistservice: TodoslistService,
                private helperService: HelperService) {
    }


    registerWithEmailPassword(value) {
        return this.angularFireAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
            .then((result) => {
                this.angularFireAuth.auth.currentUser.sendEmailVerification();
                const userId = this.angularFireAuth.auth.currentUser.uid;
                const userDoc = this.angularFirestore.doc<any>('users/' + userId);
                userDoc.set({
                    firstName: value.firstName,
                    lastName: value.lastName,
                    email: value.email,
                    id: userId,
                });
                return true;
            }).catch((error) => {
                return false;
            });
    }

    loginWithEmailPassword(value) {
        return new Promise<any>((resolve, reject) => {
            this.angularFireAuth.auth.signInWithEmailAndPassword(value.email, value.password)
                .then(
                    (res) => {
                        if (res.user.emailVerified !== true) {
                            this.helperService.presentToast('Please validate your email address. Kindly check your inbox.');
                        } else {
                            resolve(res);
                            this.todolistservice.init_fire();
                        }
                    },
                    err => reject(err)),
                this.email = value.email;
        });
    }

    logoutUser() {
        return new Promise((resolve, reject) => {
            if (this.angularFireAuth.auth.currentUser) {
                this.angularFireAuth.auth.signOut()
                    .then(() => {
                        console.log('LOG Out');
                        resolve();
                        this.todolistservice.getUnsubscribe();
                        this.todolistservice.clean_list();
                    }).catch((error) => {
                    reject();
                });
            }
        });
    }


    userDetails() {
        return this.angularFireAuth.auth.currentUser;
    }

}
