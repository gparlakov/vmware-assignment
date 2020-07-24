import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { AuthGuard } from './auth.guard';
import { RepoDetailsComponent } from './repositories/repo-details/repo-details.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'repositories',
        component: RepositoriesComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'details/:name',
            component: RepoDetailsComponent
          }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 