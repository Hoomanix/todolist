import {AlertController, Platform, ToastController} from '@ionic/angular';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    constructor(private platform: Platform, private toastController: ToastController
        , private alertController: AlertController) {
    }

    static  prepareValidationMessage(form, validationMessage, formFields) {
        for (const field in formFields) {
            formFields[field] = '';
            const control = form.controls[field];
            if (control && control.invalid) {
                const messageObj = validationMessage[field];
                for (const key in control.errors) {
                    formFields[field] = formFields[field] + messageObj[key] + ' ';
                }
            }
        }
        return formFields;
    }

    isNativePlaform() {
        return (this.platform.is('cordova') || this.platform.is('capacitor'));
    }

    async presentToast(message) {
        const toast = await this.toastController.create({
            message,
            duration: 1500,
            showCloseButton: true,
            position: this.platform.is('desktop') ? 'top' : 'bottom'
        });
        toast.present();
    }

    async presentAlertConfirm(header, message, buttons) {
        const alert = await this.alertController.create({
            header,
            message,
            buttons
        });

        await alert.present();
    }

}
