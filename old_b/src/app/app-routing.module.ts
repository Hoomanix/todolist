import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthService} from './auth.service';
import {AuthGuard} from './services/auth.gaurd';

const routes: Routes = [
  { path: '', redirectTo: 'authent', pathMatch: 'full' },
  {
    path: 'todoslist',
    loadChildren: () => import('./todoslist/todoslist.module').then( m => m.TodoslistPageModule), canActivate : [AuthGuard]
  },
  {
    path: 'addtodo',
    loadChildren: () => import('./addtodo/addtodo.module').then( m => m.AddtodoPageModule), canActivate : [AuthGuard]
  },
  {
    path: 'authent',
    loadChildren: () => import('./authent/authent.module').then( m => m.AuthentPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'addlisttodo',
    loadChildren: () => import('./addlisttodo/addlisttodo.module').then( m => m.AddlisttodoPageModule), canActivate : [AuthGuard]
  },
  {
    path: 'todo-item',
    loadChildren: () => import('./todo-item/todo-item.module').then( m => m.TodoItemPageModule), canActivate : [AuthGuard]
  },
  {
    path: 'additem',
    loadChildren: () => import('./additem/additem.module').then( m => m.AdditemPageModule), canActivate : [AuthGuard]
  },
  {
    path: 'share-todo',
    loadChildren: () => import('./share-todo/share-todo.module').then( m => m.ShareTodoPageModule), canActivate : [AuthGuard]
  },
  {
    path: 'shared-lists',
    loadChildren: () => import('./shared-lists/shared-lists.module').then(m => m.SharedListsPageModule),canActivate : [AuthGuard]
},
  {
    path: 'camera',
    loadChildren: () => import('./camera/camera.module').then( m => m.CameraPageModule)
  },
  {
    path: 'reset-pass',
    loadChildren: () => import('./reset-pass/reset-pass.module').then( m => m.ResetPassPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule), canActivate : [AuthGuard]
  },
  {
    path: 'edit-item',
    loadChildren: () => import('./edit-item/edit-item.module').then( m => m.EditItemPageModule),canActivate : [AuthGuard]
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
