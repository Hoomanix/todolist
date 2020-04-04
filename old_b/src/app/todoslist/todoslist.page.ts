import { HelperService } from './../services/helper.service';
import {Component, OnInit, Output, AfterViewInit} from '@angular/core';
import { List } from '../model/list';
import { TodoslistService } from '../services/todoslist.service';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {NavController, IonItemSliding} from '@ionic/angular';
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
  enEcriture = false; 
  enLecture = true; 
  id: string;
    capturedSnapURL:string;
    todoDetail: any = {};
    showDeleteTodoSpinner = false;

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
  public filterData : any; 
  public filterDataR : any;
  public filterDataW : any;
    lecture= false;
    search: boolean;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private helperService: HelperService,
    private listService: TodoslistService,
    private authservice: AuthService, 
    private navCtrl: NavController,
    public route: Router,private camera: Camera
  ) {
    this.itmbool = false;
    this.a = this.authservice.a;
    this.Listtodos = this.listService.get();
    this.ListReaders = this.listService.getReaders();
    this.ListWriters = this.listService.getWriters();

  }

  ngOnInit(): void {
      console.log(this.listService.get());
      this.listService.init_fire();

      this.Listtodos = this.listService.get();
      this.ListReaders = this.listService.getReaders();
      this.ListWriters = this.listService.getWriters();
      this.filterData = this.listService.get();
      
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

    getListReaders() {
        this.enLecture  = false;

        return this.listService.getReaders();
    }

    getListWriters() {
        return this.listService.getWriters();
    }
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
                this.authservice.authenticated = false;
                console.log('byebye');
                console.log(res);
                this.errorMessage = '';
                this.navCtrl.navigateForward('');
            }, err => {
                this.errorMessage = err.message;
            });

    }
    AfficherTodo(id: string) {
      console.log("okokoko");
        this.listService.readerbool = false;
        this.listService.id  = id;
        this.route.navigate(['/todo-item']);


    }

    goShare(){
      this.route.navigate(['/shared-lists']);
    }
    AddTodo() {
      this.route.navigate(['/addtodo']);
  }
    Afficherhtml2(id: string , reader : string) {
        this.listService.id  = id;
        this.listService.readerbool = true;
        this.route.navigate(['/todo-item']);


    }
    deleteTodo(id: string, todoTitle:string) {
      this.helperService.presentAlertConfirm(
          'Suprimer une liste ',
          `Êtes-vous sûr(e) de vouloir supprimer   ${todoTitle} ?`,
          [
              {
                  text: 'NON',
                  role: 'cancel',
                  handler: (blah) => {
                  }
              }, {
              text: 'OUI',
              handler: async () => {
                  try {
                      this.showDeleteTodoSpinner = true;
                      await this.listService.deleteTodo('todos', id);
                      this.helperService.presentToast('Liste supprimee!!');
                      this.showDeleteTodoSpinner = false;
                      this.route.navigate(['/todoslist']);
                  } catch (error) {
                      this.helperService.presentToast(error.message);
                      console.log('Erreur de suppression ', error);
                      this.showDeleteTodoSpinner = false;
                  }
              }
          }
          ]
      );
  }



  
    shareTodo(id: string) {
        this.listService.id = id;
        this.route.navigate(['/share-todo']);
    }
    goToprofile(){
        this.route.navigate(['/profile']);
    }

    partageEnEcriture(){
        this.enEcriture = true;
    }

    partageEnLecture(){
        this.enLecture  = true;
    }

    getItemssearch(searchbar) {
       
        
        // set q to the value of the searchbar
        var q = searchbar.srcElement.value;
        console.log(q);
        this.search = true; 
    
        // if the value is an empty string don't filter the items
        if (!q) {
            this.search = false;
          return;
        }
    
        this.filterData =this.getList().filter((v) => {
          if(v.title && q) {
            if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
              return true;
            }
            return false;
          }
        });

        this.filterDataR =this.getListReaders().filter((v) => {
            if(v.title && q) {
              if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                return true;
              }
              return false;
            }
          });

          this.filterDataW =this.getListWriters().filter((v) => {
            if(v.title && q) {
              if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                return true;
              }
              return false;
            }
          });
    
       /* console.log(q, this.filterData);
        console.log(q, this.filterDataW);
        console.log(q, this.filterDataR);*/

    
      }
}

