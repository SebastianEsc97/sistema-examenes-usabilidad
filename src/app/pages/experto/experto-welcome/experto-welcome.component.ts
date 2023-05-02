import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-experto-welcome',
  templateUrl: './experto-welcome.component.html',
  styleUrls: ['./experto-welcome.component.css']
})
export class ExpertoWelcomeComponent implements OnInit {
  user: any = null;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
  }
}
