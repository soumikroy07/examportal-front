import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLoggedIn = false;

  constructor(public login: LoginService, public _router: Router) { }

  ngOnInit(): void{
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(data =>{
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    })
  }
  
  user = this.login.getUser();



  public logout() {
    this.login.logout();
    // this.isLoggedIn = false
    // this.user = null

    window.location.reload()
  }

  public about(){
    this._router.navigate(['/about'])
  }

  public userLogin(){
    this._router.navigate(['/login'])
  }

  public userRegister(){
    this._router.navigate(['/signup'])
  }

  public handleUserDashboard(){
    if(this.user.authorities[0].authority == 'ADMIN'){
      this._router.navigate(['/admin/profile'])
    }else{
      this._router.navigate(['/user-dashboard/profile'])
    }
  }

}
