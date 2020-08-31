import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize, filter } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Subscription, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPassForm: FormGroup;
  busy: Subscription;
  resetPasswordToken: string;

  constructor(
    private fb: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router,
  ) {}

  ngOnInit(): void {
  }
}
