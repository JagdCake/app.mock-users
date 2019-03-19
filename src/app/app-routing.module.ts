import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard/users/1',
    },
    {
        path: 'dashboard/users',
        children: [
            {
                path: 'add',
                component: UserFormComponent,
            },
            {
                path: ':id/edit',
                component: UserFormComponent,
            },
            {
                path: ':page',
                component: DashboardComponent,
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'dashboard/users/1',
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
