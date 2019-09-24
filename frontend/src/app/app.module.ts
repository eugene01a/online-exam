import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatToolbarModule} from '@angular/material';
import * as Auth0 from 'auth0-web';
import {CallbackComponent} from './callback.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {ExamsApiService} from './exams/exams-api.service';
import {ExamFormComponent} from './exams/exam-form.component';
import {RouterModule, Routes} from '@angular/router';
import {ExamsComponent} from './exams/exams.component';
import {FormsModule} from '@angular/forms';
import {ModalComponent} from './_directives';
import {ModalService} from './_services';


const appRoutes: Routes = [
  {path: 'callback', component: CallbackComponent},
  {path: 'new-exam', component: ExamFormComponent},
  {path: '', component: ExamsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ExamFormComponent,
    ExamsComponent,
    CallbackComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
  ],
  providers: [ExamsApiService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor() {
  //   Auth0.configure({
  //     domain: 'dev-s5ay29rq.auth0.com',
  //     audience: 'https://dev-s5ay29rq.auth0.com/api/v2/',
  //     clientID: 'T0fB92fSn7yTXou5c94w8hBY0R5nqBHG',
  //     redirectUri: 'http://localhost:4200/callback',
  //     scope: 'openid profile manage:exams'
  //   });
  // }
}

// import { NgModule }      from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule }    from '@angular/forms';
//
// import { AppComponent }  from './app.component';
// import { routing }        from './app.routing';
//
// import { ModalComponent } from './_directives';
// import { ModalService } from './_services';
// import { HomeComponent } from './home';
// import { TestPageComponent } from './test-page';
//
// @NgModule({
//     imports: [
//         BrowserModule,
//         FormsModule,
//         routing
//     ],
//     declarations: [
//         AppComponent,
//         ModalComponent,
//         HomeComponent,
//         TestPageComponent
//     ],
//     providers: [
//         ModalService
//     ],
//     bootstrap: [AppComponent]
// })
//
// export class AppModule { }
