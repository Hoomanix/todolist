import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TodoslistService} from '../../../services/todoslist.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HelperService} from '../../../services/helper.service';
import {FirestoreDbService} from '../../../services/firestore-db.service';
import {ADDTodoOrItem} from '../../../constants/formValidationMessage';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.page.html',
  styleUrls: ['./addtodo.page.scss'],
})
export class AddtodoPage implements OnInit {
  addTodoForm: FormGroup;
  title: FormControl;
  formError: any = {
    title: '',
  };
  validationMessage: any = ADDTodoOrItem;
  showAddTodoSpinner = false;


  constructor(private listService: TodoslistService,
              private router: Router,
              private helperService: HelperService,
              private firestoreDbService: FirestoreDbService,
              private angularFireAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  /*  addList() {
      const list = { title: this.title, owner : firebase.auth().currentUser.email, writers : { idWriter : firebase.auth().currentUser.email } , readers : { }} as List;
      this.listService.addList(list);
      this.router.navigate(['/tasks']);*/

  /*
    }
  */


  async addTodo() {
    try {
      await this.firestoreDbService.insertData('todos', {
        title: this.title.value,
        owner: this.angularFireAuth.auth.currentUser.email/*, writers : { idWriter : angularFireAuth.auth.currentUser.email , readers : { }} as List ;*/
      });
      this.showAddTodoSpinner = false;
      this.helperService.presentToast('Product Added Successfully!');
      this.router.navigate(['/tasks']);
    } catch (error) {
      console.log('in add todo', error);
      this.helperService.presentToast(error.message);
      this.showAddTodoSpinner = false;
    }
  }

  createFormControl() {
    this.title = new FormControl('', [
      Validators.required
    ]);
  }

  createForm() {
    this.addTodoForm = new FormGroup({
      title: this.title
    });
    this.addTodoForm.valueChanges.subscribe(data => this.onFormValueChanged(data));
  }

  onFormValueChanged(data) {
    this.formError = HelperService.prepareValidationMessage(this.addTodoForm, this.validationMessage, this.formError);
  }

}
