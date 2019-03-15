import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard/1',
    },
    {
        path: 'dashboard',
        redirectTo: 'dashboard/1',
    },
    {
        path: 'dashboard/:page',
        component: DashboardComponent,
    },
    {
        path: 'dashboard/user/add',
        component: UserFormComponent,
    },
    {
        path: 'dashboard/user/:id/edit',
        component: UserFormComponent,
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
