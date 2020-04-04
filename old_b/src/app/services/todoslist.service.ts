import { Injectable } from '@angular/core';
import { Item } from '../model/item';
import { List } from '../model/list';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import * as admin from 'firebase-admin';



@Injectable()
export class TodoslistService {
  private _rootRef: any;
  
 


  private todolistCollection: AngularFirestoreCollection<List>;
  private itemlistCollection: AngularFirestoreCollection<Item>;
  private usersCollection: AngularFirestoreCollection<any>;
  private todolistCollectionReader : AngularFirestoreCollection<List>;
  private todolistCollectionWriter : AngularFirestoreCollection<List>;
  public   unsubtodos:any;
  private   unsubReaders:any;
  private   unsubWriter:any;

  private todos: Observable<Array<List>>;
  private readers: Observable<Array<List>>;
  private writers: Observable<Array<List>>;
  private users:  Observable<Array<List>>;

  // tslint:disable-next-line:no-shadowed-variable
  public listtodos: Array<List>;
  public listreaders: Array<List>;
  public listwriters: Array<List>;
  public listusers: Array<List>;



  id: string;
  item: Item;
  private userId: string;
    readerbool: boolean;

  constructor(private db: AngularFirestore) {
    this.listtodos = new Array<List>();
    this.listreaders = new Array<List>();
    this.listwriters = new Array<List>();
    this.listusers = new Array<any>()
    this._rootRef = firebase.database().ref('/users');
   /* this.itemlistCollection = db.collection<Item>('items');
    this.todolistCollection = db.collection<List>('todos', ref => ref.where('iduser', '==', firebase.auth().currentUser.uid));
    this.usersCollection = db.collection<any>('users');

    this.todos = this.todolistCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        }));
    this.todos.subscribe(res => {
      this.listtodos = res;

    });*/
  }

  init_fire() {
    this.itemlistCollection = this.db.collection<Item>('items');
    this.todolistCollection = this.db.collection<List>('todos', ref => ref.where('owner', '==', firebase.auth().currentUser.email));
    this.todolistCollectionReader = this.db.collection<List>('todos', ref => ref.where('readers', 'array-contains', firebase.auth().currentUser.email));
    this.todolistCollectionWriter = this.db.collection<List>('todos', ref => ref.where('writers', 'array-contains', firebase.auth().currentUser.email));

    this.usersCollection = this.db.collection<any>('users', ref => ref.where('email', '==', firebase.auth().currentUser.email));

    this.todos = this.todolistCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        }));
    this.readers = this.todolistCollectionReader.snapshotChanges().pipe(
        map(actions => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        }));

    this.writers = this.todolistCollectionWriter.snapshotChanges().pipe(
        map(actions => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        }));
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map((a: any) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    this.unsubtodos = this.todos.subscribe(res => {
      this.listtodos = res;

    });

    this.unsubReaders =  this.readers.subscribe(res => {
      this.listreaders = res;
    });

    this.unsubWriter= this.writers.subscribe(res => {
      this.listwriters = res;
    });

    this.users.subscribe(res => {
      this.listusers = res;
    });

    
  }
  clean_list() {
      this.itemlistCollection = null;
      this.todolistCollection = null;
      this.usersCollection = null;
      this.listtodos = null;


    }

  /**
   * renvoie une liste de todoList
   */
  public get(): Array<List> {

    return this.listtodos;
  }

  
  public getReaders(){
    return this.listreaders;
  }
  public getWriters(){
    return this.listwriters;
  }

  public getUserInfo(){
    return this.listusers;
  }
  /*public isToreader(list : List){
    this.todolistCollection.doc(this.id).ref
    return 

  }
*/
  public  getItems(): Observable<Array<Item>> {
    return this.todolistCollection.doc(this.id).collection<Item>('items').snapshotChanges().pipe( map(actions => {
      return actions.map((a: any) => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  /**
   * Supprime une list passée en parametre
   * @param list
   */
  public delete(list: List) {
    console.log('supp');
    console.log(list);
    return this.todolistCollection.doc(list.id).delete();
  }

  async deleteTodo(collectionName, docId) {
    try {
        const result = await this.db.doc(`${collectionName}/${docId}`).delete();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

  /**
   * ajoute une liste
   * @param list
   */
  addList(list: List) {
    this.userId = firebase.auth().currentUser.uid;
    //console.log(this.usersCollection.doc(this.userId).get());
    //console.log(this.userId);
    console.log(list);
    return this.todolistCollection.add(list);

  }

  /**
   * Ajoute un item dans ???
   * @param item
   */
  addItem(item: Item) {
    return this.todolistCollection.doc(this.id).collection('items').add(item);
  }

  /**
   *
   * @param list
   */
/*
  getItem(id:number): Observable<Item> {
    return this.getItems()
        .map(items => items.find(item => item.id === id));
  }
*/

async deleteItem(itemId, todoItemsId) {
  try {
      const result = await this.db.doc(`todos/${todoItemsId}/items/${itemId}`).delete();
      return result;
  } catch (error) {
      throw new Error(error);
  }
}


  update(item: Item) {
    console.log('on est dans update');
    return this.todolistCollection.doc(this.id).collection('items').doc(item.id).set(
        {
          isDone : item.isDone
        },
        {
          merge: true
        }
    );

  }


  editItem(title: string , desc: string) {
    console.log('on est dans update');
    return this.todolistCollection.doc(this.id).collection('items').doc(this.item.id).set(
        {
          title : title,
          description : desc
        },
        {
          merge: true
        }
    );

  }
    addUserReader(id: string, mail: string) {
      const tab = this.todolistCollection.doc(id);
      console.log(tab);
      return this.todolistCollection.doc(id).set(
          {
           readers:  firebase.firestore.FieldValue.arrayUnion(mail)
          },
      {
        merge: true
      }
      );

  }

  addUserwriter(id: string, writer: string) {

    return this.todolistCollection.doc(id).set(
        {
          writers:  firebase.firestore.FieldValue.arrayUnion(writer)
        },
        {
          merge: true
        }
    );
  }

  getUnsubscribe(){
     this.unsubtodos.unsubscribe();
     this.unsubReaders.unsubscribe();
     this.unsubWriter.unsubscribe();
  }
}
