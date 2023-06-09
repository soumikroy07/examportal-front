import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user = null;
  constructor(private login: LoginService){}
  // user = this.login.getUser();
  ngOnInit(): void{
    this.user = this.login.getUser();
  }
}
