import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private messageServices: MessageService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.messageServices.add({
      severity: 'success',
      summary: 'Adios',
      detail: 'Nos Vemos Pronto',
    });
    this.authService.logout();
  }
}
