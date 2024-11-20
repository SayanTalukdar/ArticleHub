import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginUserComponent } from './components/users/login-user/login-user.component';
import { NewUserComponent } from './components/users/new-user/new-user.component';
import { AllArticlesComponent } from './components/articles/all-articles/all-articles.component';
import { CreateArticlesComponent } from './components/articles/create-articles/create-articles.component';
import { UsersArticlesComponent } from './components/articles/users-articles/users-articles.component';
import { EditArticlesComponent } from './components/articles/edit-articles/edit-articles.component';


const routes: Routes = [
  {
    path: "",
    component: AllArticlesComponent
  },
  {
    path: "user/login",
    component: LoginUserComponent
  },
  {
    path: "user/signup",
    component: NewUserComponent
  },
  {
    path: "articles/create/new",
    component: CreateArticlesComponent
  },
  {
    path: "articles/edit/:id",
    component: EditArticlesComponent
  },
  {
    path: "articles/my-articles",
    component: UsersArticlesComponent
  },
  {
    path: "**",
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
