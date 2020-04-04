import { HelperService } from './../services/helper.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../model/item';
import { TodoslistService } from '../services/todoslist.service';
import {List} from '../model/list';
import * as firebase from 'firebase/app';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {

  matches: string[];
  title: string;
  hello: string;
  desc: string;
  matchess: string[];
  showAddTodoSpinner = false;

  constructor(private listService: TodoslistService,
              private router: Router ,
              private helperService: HelperService, private speechRecognition: SpeechRecognition,private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.title = this.listService.item.title;
    this.desc = this.listService.item.description;
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {

        if (!hasPermission) {
        this.speechRecognition.requestPermission()
          .then(
            () => console.log('Granted'),
            () => console.log('Denied')
          )
        }

     });
  }
  startvoca1() {
    this.title = '';
    this.speechRecognition.startListening()
      .subscribe(
        (matchess: string[]) => {
          this.matches = matchess;
          this.title = this.matches[0].toString();
          this.cd.detectChanges();
        },
        (onerror) => console.log('error:', onerror)
      );
      //this.title = this.matches[0].toString();
}

startvoca2() {
  this.desc = '';

  this.speechRecognition.startListening()
    .subscribe(
      (matchess: string[]) => {
        this.matchess = matchess;
        this.desc = this.matchess[0].toString();
        this.cd.detectChanges();
      },
      (onerror) => console.log('error:', onerror)
    );
    //this.desc = this.matchess[0].toString();

}


  editItem() {
    this.listService.editItem(this.title,this.desc).then(()=>{
     // this.listService.getUnsubscribe();

    });
    this.router.navigate(['/todo-item']).then(()=>{
      this.helperService.presentToast('Tâche modifiée!');
      //this.listService.getUnsubscribe();
    });
  }

  RetourSurItems() {
   this.router.navigate(['/todo-item'])
  }

}
