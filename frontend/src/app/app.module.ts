import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatToolbarModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ExamsApiService} from './exams/exams-api.service';
import {ExamFormComponent} from './exams/exam-form.component';
import {ExamsComponent} from './exams/exams.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertComponent, ModalComponent} from './_directives';
import {AlertService, AuthenticationService, ModalService, UserService} from './_services';
import {routing} from './app.routing';
import {AuthGuard} from './_guards';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {LogoutComponent} from "./logout";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {JwtInterceptor, ErrorInterceptor} from "./_helpers";

@NgModule({
  declarations: [
    AlertComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    AppComponent,
    ExamFormComponent,
    ExamsComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    HttpClientModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
  ],
  providers: [
    ExamsApiService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    ModalService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
