import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router'
import {AuthenticationService, ModalService} from "./_services";
import {Observable} from "rxjs/Rx"

@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit() {
  }

  openModal(id: string) {
    this.modalService.open(id);
  }


}
