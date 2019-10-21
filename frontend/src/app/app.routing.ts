import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {AuthGuard} from './_guards';

import {ExamFormComponent} from "./exams/exam-form.component";
import {ExamsComponent} from "./exams/exams.component";

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'new-exam', component: ExamFormComponent, canActivate: [AuthGuard]},
  {path: 'exams', component: ExamsComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'exams'}
];

export const routing = RouterModule.forRoot(appRoutes);
