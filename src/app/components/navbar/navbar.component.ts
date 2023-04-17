import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any = null;
  constructor(public loginService: LoginService) {

  }
  ngOnInit(): void {
    this.user = this.loginService.getUser();
  }

  public logout() {
    this.loginService.logout();
    window.location.reload();
  }

}
