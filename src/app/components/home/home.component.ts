import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { MessageService } from 'primeng/api';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  usuarios: any[] = [];

  constructor(
    private authService: AuthService,
    private messageServices: MessageService
  ) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.authService.getUsuarios().subscribe((data) => {
      data.forEach((element: any) => {
        //console.log(element.payload.doc.id);
        //console.log(element.payload.doc.data());
        this.usuarios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
    });
  }

  logout() {
    this.messageServices.add({
      severity: 'success',
      summary: 'Adios',
      detail: 'Nos Vemos Pronto',
    });
    this.authService.logout();
  }
}
