import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-experto-sidebar',
  templateUrl: './experto-sidebar.component.html',
  styleUrls: ['./experto-sidebar.component.css']
})
export class ExpertoSidebarComponent implements OnInit {

  constructor(public login: LoginService) { }
  ngOnInit(): void {
  }
  public logout() {
    this.login.logout();
    window.location.href =""
  }
}