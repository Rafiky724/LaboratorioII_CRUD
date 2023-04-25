import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUser: any = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login(loginUser: any) {
    this.authService.login(loginUser.email, loginUser.password);
  }

  loginGoogle() {
    try {
      this.authService.loginWithGoogle();
    } catch (error) {
      console.log(error);
    }
  }

  loginGithub() {
    try {
      this.authService.loginWithGithub();
    } catch (error) {
      console.log(error);
    }
  }

  loginTwitter() {
    try {
      this.authService.loginWithTwitter();
    } catch (error) {
      console.log(error);
    }
  }
}
