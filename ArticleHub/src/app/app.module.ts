import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuillModule } from 'ngx-quill';

import { AppComponent } from './app.component';
import { LoginUserComponent } from './components/users/login-user/login-user.component';
import { NewUserComponent } from './components/users/new-user/new-user.component';
import { UserService } from './services/users/user-service.service';
import { ArticleService } from './services/articles/article.service';
import { NavbarComponent } from './components/core/navbar/navbar.component';
import { CreateArticlesComponent } from './components/articles/create-articles/create-articles.component';
import { UsersArticlesComponent } from './components/articles/users-articles/users-articles.component';
import { EditArticlesComponent } from './components/articles/edit-articles/edit-articles.component';
import { ArticleDetailsComponent } from './components/articles/article-details/article-details.component';
import { AllArticlesComponent } from './components/articles/all-articles/all-articles.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommentService } from './services/articles/comment.service';
import { UploadComponent } from './components/articles/create-articles/upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    NewUserComponent,
    NavbarComponent,
    AllArticlesComponent,
    CreateArticlesComponent,
    UsersArticlesComponent,
    EditArticlesComponent,
    ArticleDetailsComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    QuillModule.forRoot()
  ],
  providers: [
    UserService,
    ArticleService,
    CommentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
