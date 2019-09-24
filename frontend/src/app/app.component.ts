import {Component, OnInit} from '@angular/core';
import {ModalService} from "./_services";

import './_content/app.less';
import './_content/modal.less';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'

})
export class AppComponent implements OnInit {
  authenticated = false;

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
