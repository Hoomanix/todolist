import { AngularFireDatabase } from '@angular/fire/database';
import { auth } from 'firebase/app';
import { TodoslistService } from './../services/todoslist.service';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  images = [];
  saveSuccess = false;
  name : string;
  menu = false;
  capturedSnapURL:string;
  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType:0,
}
  imgLoad: any;
  firebase: any;
  errorMessage = '';


  constructor( private router: Router,
    private navCtrl : NavController,
    private auth: AuthService, private alertCtrl: AlertController, 
    private loading: LoadingController,
    private todoslistservice: TodoslistService,
    private camera: Camera,
    private authservice: AuthService,
    public afDB: AngularFireDatabase,
    public afSG: AngularFireStorage ) {
    //this.getImagesDatabase();
    this.imgLoad ='assets/avatar.png';
    this.getImage();     
  }
 
  ngOnInit(): void {
     
  }

  getUserInfos(){
    console.log(this.todoslistservice.getUserInfo(),'----');
    //this.capturedSnapURL = firebase. ;
    return this.todoslistservice.getUserInfo();
  }

  photoprofile(choix : number){
    const cameraOptions: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:choix,
  }
    this.camera.getPicture(cameraOptions).then((imageData) => {
      // this.camera.DestinationType.FILE_URI gives file URI saved in local
      // this.camera.DestinationType.DATA_URL gives base64 URI
      console.log("Avant");

      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.capturedSnapURL = base64Image;
      console.log("Apres");
      this.upload(firebase.auth().currentUser.uid);

  }, (err) => {

      console.log(err);
      // Handle error
  });
  }

  
  upload(id: string) {
    const storageRef = firebase.storage().ref();
    const filename = id+'1';
    const imageRef = storageRef.child( id +`/${filename}.jpg`);
    imageRef.putString(this.capturedSnapURL, firebase.storage.StringFormat.DATA_URL)
        .then((snapshot) => {

        });
}

  public save() {
    /*this.auth.register(this.info).subscribe(success => {
      if (success) {
        this.saveSuccess = true;
        this.showPopup("Success", "Thanks! Profile updated.");
      } else {
        this.showPopup("Error", "Problem updating profile.");
      }
    },
    error => {
      this.showPopup("Error", error);
    });*/
  }

  async showPopup(title, text) {
    let alert = await this.alertCtrl.create({
      header: title,
      message: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.saveSuccess) {
              // console.log('create successs');
              this.router.navigateByUrl('/home');
            }
          }
        }
      ]
    });

    return await alert.present();
  }

  getImagesDatabase() {
    this.afDB.list(firebase.auth().currentUser.uid).snapshotChanges(['child_added']).subscribe(images => {
      images.forEach(image => {
        this.getImagesStorage(image);
      });
    });
  }

  getImage() {
     try {
         firebase.storage().ref().child("/"+firebase.auth().currentUser.uid+"/" + firebase.auth().currentUser.uid+"1.jpg").getDownloadURL().then((url)=> {
           this.imgLoad = url; 
         });
     } catch (e) {
        this.imgLoad ='assets/avatar.png';
         console.log("hello");
         console.log(e);
     }
 }

  getImagesStorage(image: any) {
    
    const imgRef = image.payload.exportVal().ref;
    this.afSG.ref(imgRef).getDownloadURL().subscribe(imgUrl => {
      console.log(imgUrl);
      this.images.push({
        name: image.payload.exportVal().name,
        url: imgUrl
      });
      this.imgLoad = this.images[0].url;

    });
  }
  ShowMenu(){
    this.menu = true;
  }
  hideMenu(){
    this.menu = false;
  }

  logout(){
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