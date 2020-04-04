import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoslistService} from '../services/todoslist.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ADDTodoOrItem} from '../constants/formValidationMessage';
import {HelperService} from '../services/helper.service';
import {FirestoreDbService} from '../services/firestore-db.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.page.html',
  styleUrls: ['./additem.page.scss'],
})
export class AdditemPage implements OnInit {
  /*  title: string;


    addItem() {
      const item = { title: this.title, isDone : false } as Item;
      this.listService.addItem(item).then(()=>{
        this.listService.getUnsubscribe();

      });
      this.router.navigate(['/todo-item']).then(()=>{
        this.listService.getUnsubscribe();
      });
    }
  */
  addItemForm: FormGroup;
  title: FormControl;
  formError: any = {
    title: '',
  };
  validationMessage: any = ADDTodoOrItem;
  showAddTodoSpinner = false;
  itemsId=''

  constructor(private listService: TodoslistService,
              private router: Router,
              private helperService: HelperService,
              private firestoreDbService: FirestoreDbService,
              private angularFireAuth: AngularFireAuth,
              private activatedRoute:ActivatedRoute) {

    this.activatedRoute.params.subscribe(result => {
      console.log('additem itemsId:', result.id);
      this.itemsId = result.id;
    });
  }

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  async addItem() {
    try {
      this.showAddTodoSpinner = true;
      await this.firestoreDbService.insertItem( this.itemsId,{
        title: this.title.value,
        isDone: false
      });
      this.showAddTodoSpinner = false;
      this.helperService.presentToast('Product Added Successfully! You can add another Item ');
      this.resetForm();
    } catch (error) {
      console.log(error);
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
    this.addItemForm = new FormGroup({
      title: this.title
    });
    this.addItemForm.valueChanges.subscribe(data => this.onFormValueChanged(data));
  }

  onFormValueChanged(data) {
    this.formError = HelperService.prepareValidationMessage(this.addItemForm, this.validationMessage, this.formError);
  }

  resetForm() {
    this.addItemForm.reset();
    this.formError = {
      title: ''
    };
  }
}
