import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  createUser: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageServices: MessageService,
    private router: Router,
  ) {
    this.createUser = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  agregarUsuario() {
    this.submitted = true;

    if (this.createUser.invalid) {
      return;
    }

    const usuario: any = {
      nombre: this.createUser.value.nombre,
      correo: this.createUser.value.correo,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };

    this.authService
      .agregarUsuario(usuario)
      .then(() => {
        console.log('Usuario Registrado');
        this.messageServices.add({
          severity: 'success',
          summary: 'Usuario',
          detail: 'Registrado Correctamente',
        });
        this.router.navigate(['home'])
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
