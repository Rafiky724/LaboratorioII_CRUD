import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [AuthService],
})
export class ForgotPasswordComponent implements OnInit {
  userEmail = new FormControl('', [Validators.required, Validators.email]);
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private messageServices: MessageService
  ) {}

  ngOnInit(): void {}

  async onReset() {
    this.isLoading = true;
    this.errorMessage = null;
    try {
      const email = this.userEmail.value;
      await this.authSvc.resetPassword(email);
      this.router.navigate(['login']);
    } catch (error: any) {
      this.errorMessage = error.message;
      this.messageServices.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Email no encontrado',
      });
    } finally {
      this.isLoading = false;
    }
  }
}
