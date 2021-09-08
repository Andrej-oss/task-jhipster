import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../admin/user-management/user-management.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input()
  user: User;
  userUrl = '../';

  constructor(private router: Router, public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log(this.user);
  }
}
