import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { MessageService } from 'primeng/api';

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
    const processedIds = new Set<string>();
    this.authService.getUsuarios().subscribe((data) => {
      data.forEach((element: any) => {
        const docId = element.payload.doc.id;
        if (!processedIds.has(docId)) {
          processedIds.add(docId);
          this.usuarios.push({
            id: docId,
            ...element.payload.doc.data(),
          });
        }
      });
    });
  }
  

  eliminarUsuario(id: string) {
    this.authService
      .eliminarUsuario(id)
      .then(() => {
        this.messageServices.add({
          severity: 'success',
          summary: 'Usuario eliminado',
          detail: 'El usuario ha sido eliminado correctamente',
        });
        setTimeout(() => {
          window.location.reload();
        }, 1);
      })
      .catch((error) => {
        console.log(error);
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
