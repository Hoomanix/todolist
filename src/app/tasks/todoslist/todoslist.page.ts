import {Component, OnInit} from '@angular/core';
import {TodoslistService} from '../../services/todoslist.service';
import {AuthService} from '../../auth/auth.service';
import {IonItemSliding, NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
import {FirestoreDbService} from '../../services/firestore-db.service';
import {HelperService} from '../../services/helper.service';

@Component({
  selector: 'app-todoslist',
  templateUrl: './todoslist.page.html',
  styleUrls: ['./todoslist.page.scss'],
})
export class TodoslistPage implements OnInit {
    todoList: Array<any> = [];
    todoDetail: any = {};
    showDeleteTodoSpinner = false;

    capturedSnapURL:string;

    cameraOptions: CameraOptions = {
        quality: 20,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    };

  public ListReaders: any;
  public ListWriters: any;

    constructor(private listService: TodoslistService,
                private firestoreDbService: FirestoreDbService,
                private authService: AuthService,
                private navCtrl: NavController,
                public router: Router,
                private camera: Camera,
                private helperService: HelperService
  ) {
        this.getTodosList();
    this.ListReaders = this.listService.getReaders();
    this.ListWriters = this.listService.getWriters();

  }

  ngOnInit(): void {

      this.ListReaders = this.listService.getReaders();
      this.ListWriters = this.listService.getWriters();
  }

    getItems(id) {
        this.router.navigate(['/tasks/tabs/todoslist/todolistId', id]);

    }

    getTodosList(event = null) {
        this.firestoreDbService.getTodos('todos').subscribe(result => {
            console.log('result', result);
            this.todoList = result;
            this.todoDetail = result;
            this.handleRefresher(event);
        }, (error) => {
            this.helperService.presentToast(error.message);
            this.handleRefresher(event);
        });
    }

    OpenAddTodoPage() {
        this.router.navigate(['/tasks/tabs/todoslist/addtodo']);
    }
    handleRefresher(event) {
        if (event) {
            event.target.complete();
        }
    }

    doRefresh(event) {
        this.getTodosList(event);
    }
    takeSnap() {
        this.camera.getPicture(this.cameraOptions).then((imageData) => {

            const base64Image = 'data:image/jpeg;base64,' + imageData;
            this.capturedSnapURL = base64Image;
        }, (err) => {
            console.log(err);
        });
    }

    upload(id: string) {
        const storageRef = firebase.storage().ref();
            const filename = Math.floor(Date.now() / 1000);
        const imageRef = storageRef.child(id + `/${filename}.jpg`);
        imageRef.putString(this.capturedSnapURL, firebase.storage.StringFormat.DATA_URL)
            .then((snapshot) => {

            });
    }
    onShareTodo(id: string) {
        this.listService.id = id;
        this.router.navigate(['/share-todo']);
    }

    deleteTodo(id: string, slidingItem: IonItemSliding) {
        this.helperService.presentAlertConfirm(
            'Delete Product',
            `Are you sure you want to delete ${this.todoDetail.title}`,
            [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: (blah) => {
                    }
                }, {
                text: 'Yes',
                handler: async () => {
                    try {
                        this.showDeleteTodoSpinner = true;
                        await this.firestoreDbService.deleteTodo('todos', id);
                        this.helperService.presentToast('Todo Deleted Successfully!');
                        this.showDeleteTodoSpinner = false;
                        slidingItem.close();
                        this.router.navigate(['/tasks']);
                    } catch (error) {
                        this.helperService.presentToast(error.message);
                        console.log('Error in Delete Todo', error);
                        this.showDeleteTodoSpinner = false;
                    }
                }
            }
            ]
        );
    }
}

