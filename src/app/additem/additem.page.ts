import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../model/item';
import { TodoslistService } from '../services/todoslist.service';
import {List} from '../model/list';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.page.html',
  styleUrls: ['./additem.page.scss'],
})
export class AdditemPage implements OnInit {
  matches: string[];
  title: string;
  hello: string;
  desc: string;
  matchess: string[];

  constructor(private listService: TodoslistService,
              private router: Router,private speechRecognition: SpeechRecognition ,private cd: ChangeDetectorRef) { }

  ngOnInit() {
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


  addItem() {
    const item = { title: this.title, isDone : false , description: this.desc} as Item;
    this.listService.addItem(item).then(()=>{
      this.listService.getUnsubscribe();

    });
    this.router.navigate(['/todo-item']).then(()=>{
      this.listService.getUnsubscribe();
    });
  }

  retourPagetodo() {
    window.history.back();
  }

}
