import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TodoslistService} from '../../../services/todoslist.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ADDTodoOrItem} from '../../../constants/formValidationMessage';
import {HelperService} from '../../../services/helper.service';
import {FirestoreDbService} from '../../../services/firestore-db.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {LoadingController} from '@ionic/angular';

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


  constructor(private listService: TodoslistService,
              private router: Router,
              private helperService: HelperService,
              private firestoreDbService: FirestoreDbService,
              private angularFireAuth: AngularFireAuth,
              private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  async addItem(id) {
    try {
      console.log('id', id);
      /*      await this.firestoreDbService.insertDataItem('todos', docid,'items', {
              title: this.title.value,
            });*/
      this.showAddTodoSpinner = false;
      this.helperService.presentToast('Product Added Successfully!');
      this.router.navigate(['/tasks/tabs/todoslist/todolistId', id]);
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
    this.addItemForm = new FormGroup({
      title: this.title
    });
    this.addItemForm.valueChanges.subscribe(data => this.onFormValueChanged(data));
  }

  onFormValueChanged(data) {
    this.formError = HelperService.prepareValidationMessage(this.addItemForm, this.validationMessage, this.formError);
  }

}
