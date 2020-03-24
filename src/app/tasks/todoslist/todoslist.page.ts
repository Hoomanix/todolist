import {Component, OnInit, Output} from '@angular/core';
import { List } from '../../model/list';
import { TodoslistService } from '../../services/todoslist.service';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {NavController} from '@ionic/angular';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-todoslist',
  templateUrl: './todoslist.page.html',
  styleUrls: ['./todoslist.page.scss'],
})
export class TodoslistPage implements OnInit {
    @Output() iid;
  a: string;
  navigate: any;
  itmbool = false;
  id: string;
    capturedSnapURL:string;

    cameraOptions: CameraOptions = {
        quality: 20,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    }

    validationsform: FormGroup;
  errorMessage = '';
  public list: Array<List> = new Array<List>();
  public Listtodos: any;
  public ListReaders: any;
  public ListWriters: any;
    lecture= false;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private listService: TodoslistService, private authservice: AuthService,  private navCtrl: NavController, public route: Router,private camera: Camera
  ) {
    this.itmbool = false;
    this.a = this.authservice.a;
    this.Listtodos = this.listService.get();
    this.ListReaders = this.listService.getReaders();
    this.ListWriters = this.listService.getWriters();

  }

  ngOnInit(): void {
      console.log(this.listService.get());
      this.Listtodos = this.listService.get();
      this.ListReaders = this.listService.getReaders();
      this.ListWriters = this.listService.getWriters();
  }

    takeSnap() {
        this.camera.getPicture(this.cameraOptions).then((imageData) => {
            // this.camera.DestinationType.FILE_URI gives file URI saved in local
            // this.camera.DestinationType.DATA_URL gives base64 URI
            console.log("Avant");

            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.capturedSnapURL = base64Image;
            console.log("Apres");

        }, (err) => {

            console.log(err);
            // Handle error
        });
    }

    upload(id: string) {
        const storageRef = firebase.storage().ref();
            const filename = Math.floor(Date.now() / 1000);
        const imageRef = storageRef.child( id +`/${filename}.jpg`);
        imageRef.putString(this.capturedSnapURL, firebase.storage.StringFormat.DATA_URL)
            .then((snapshot) => {

            });
    }

    /**
     * Renvoyer la liste des taches
     */
  getList() {
      return this.listService.get();
  }

/*    getListReaders() {
        return this.listService.getReaders();
    }

    getListWriters() {
        return this.listService.getWriters();
    }*/
    /**
     * Supprimer une liste de tàche
     * @param pos
     */
  delete(pos: number) {
    // tslint:disable-next-line:no-shadowed-variable
      this.listService.delete(this.getList()[pos]);
      this.listService.get();
  }
    /**
     * Se deconnecter
     */
    logOut() {
        this.authservice.logoutUser()
            .then(res => {
                this.authservice.isAuthenticated = false;
                console.log('byebye');
                console.log(res);
                this.errorMessage = '';
                this.navCtrl.navigateForward('');
            }, err => {
                this.errorMessage = err.message;
            });

    }
    onDisplayItems(id: string) {
        this.listService.id  = id;
        this.route.navigate(['/todo-item']);


    }

    onShareTodo(id: string) {
        this.listService.id = id;
        this.route.navigate(['/share-todo']);
    }
}

