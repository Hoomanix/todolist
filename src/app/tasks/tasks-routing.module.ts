import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TasksPage} from './tasks.page';

const routes: Routes = [

    {
        path: 'tasks',
        component: TasksPage,
        children: [
            {
                path: 'todoslist',
                loadChildren: () => import('../todoslist/todoslist.module').then(m => m.TodoslistPageModule)
            },
            {
                path: 'shared-lists',
                loadChildren: () => import('../shared-lists/shared-lists.module').then(m => m.SharedListsPageModule)
            },

        ]
    },
    {
        path: '',
        redirectTo: 'tasks/todoslist',
        pathMatch: 'full'
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TasksPageRoutingModule {

}

