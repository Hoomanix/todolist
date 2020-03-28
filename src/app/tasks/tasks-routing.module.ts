import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TasksPage} from './tasks.page';

const routes: Routes = [

    {
        path: 'tabs',
        component: TasksPage,
        children: [
            {
                path: '',
                redirectTo: 'tabs/todoslist',
                pathMatch: 'full'
            },
            {
                path: 'todoslist',
                children: [
                    {
                        path: '',
                        loadChildren: './todoslist/todoslist.module#TodoslistPageModule'
                    },
                    {
                        path: ':todolistId/:id',
                        loadChildren: './todoslist/todo-item/todo-item.module#TodoItemPageModule'
                    },

                    {
                        path: 'additem',
                        loadChildren: './todoslist/additem/additem.module#AdditemPageModule'
                    },
                    {
                        path: 'addtodo',
                        loadChildren: './todoslist/addtodo/addtodo.module#AddtodoPageModule'
                    },

                ]
            },
            {
                path: 'shared-lists',
                children: [
                    {
                        path: '',
                        loadChildren: './shared-lists/shared-lists.module#SharedListsPageModule'
                    }

                ]
            },

        ]
    },
    {
        path: '',
        redirectTo: 'tabs/todoslist',
        pathMatch: 'full'
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TasksPageRoutingModule {

}

