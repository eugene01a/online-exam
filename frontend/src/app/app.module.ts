import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatToolbarModule} from '@angular/material';
import {CallbackComponent} from './callback.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {ExamsApiService} from './exams/exams-api.service';
import {ExamFormComponent} from './exams/exam-form.component';
import {ExamsComponent} from './exams/exams.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertComponent, ModalComponent} from './_directives';
import {AlertService, AuthenticationService, ModalService, UserService} from './_services';
import {AuthService} from './auth/auth.service';
import {ErrorInterceptor, JwtInterceptor} from './_helpers';
import {routing} from './app.routing';
import {AuthGuard} from './_guards';
import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';

@NgModule({
  declarations: [
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AppComponent,
    ExamFormComponent,
    ExamsComponent,
    CallbackComponent,
    ModalComponent,
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
    ModalService,
    AuthService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
