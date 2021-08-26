import { Component, OnInit } from '@angular/core';
import {SecurityService} from '../../../shared/services/security.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  constructor(public securityService: SecurityService) { }

  ngOnInit(): void {
  }

}
