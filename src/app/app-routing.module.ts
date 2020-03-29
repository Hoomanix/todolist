import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/auth.gaurd';

const routes: Routes = [
    {path: '', redirectTo: 'tasks', pathMatch: 'full'},
    {
        path: 'auth',
        loadChildren: () => import('./auth/authent.module').then(m => m.AuthentPageModule)
    },
    {
        path: 'tasks',
        loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksPageModule)
    },
    {
        path: 'todo-item/:id',
        loadChildren: () => import('./todo-item/todo-item.module').then(m => m.TodoItemPageModule)
    },
    {
        path: 'addtodo',
        loadChildren: () => import('./addtodo/addtodo.module').then(m => m.AddtodoPageModule)
    },
    {
        path: 'additem/:id',
        loadChildren: () => import('./additem/additem.module').then(m => m.AdditemPageModule)
    },
    {
        path: 'shared-lists',
        loadChildren: () => import('./shared-lists/shared-lists.module').then(m => m.SharedListsPageModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./inscription/register.module').then(m => m.RegisterPageModule)
    },
    {
        path: 'share-todo',
        loadChildren: () => import('./share-todo/share-todo.module').then(m => m.ShareTodoPageModule), canActivate: [AuthGuard]
    },
    {
        path: 'camera',
        loadChildren: () => import('./shared/pickers/camera/camera.module').then(m => m.CameraPageModule)
    },
    {
        path: 'reset-pass',
        loadChildren: () => import('./reset-pass/reset-pass.module').then(m => m.ResetPassPageModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
    },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
