import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public title = 'Pinned Repositories';
  public loggedUser: string = "";

  constructor(private loginService: LoginService, private router: Router) {}

  hasLoggedUser() {
    const user = this.loginService.getLoggedUser();
    if (user !== '') {
      this.loggedUser = user;
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }
}
