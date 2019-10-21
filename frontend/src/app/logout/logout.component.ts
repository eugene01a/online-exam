import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {AlertService, AuthenticationService, ModalService} from '../_services';
import {AppComponent} from "../app.component";
import {first} from "rxjs/operators";

@Component({
  selector: 'logout',
  templateUrl: 'logout.component.html'
})
export class LogoutComponent implements OnInit {
  returnUrl: string
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private modalService: ModalService,
    private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.returnUrl = '/';

  }

  onCancel() {
    this.modalService.close('logout-modal')
  }

  onSubmit() {
    this.authenticationService.logout()
      .pipe(first())
      .subscribe(
        data => {
          this.appComponent.isLoggedIn = false
          this.router.navigate([this.returnUrl]);

        });

    this.modalService.close('logout-modal')
  }
}
