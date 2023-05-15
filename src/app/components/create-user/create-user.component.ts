import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.createUser = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  agregarUsuario() {
    this.submitted = true;

    if (this.createUser.invalid) {
      return;
    }

    const usuario: any = {
      displayName: this.createUser.value.displayName,
      email: this.createUser.value.email,
      password: this.createUser.value.password,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };

    this.authService
      .agregarUsuario(usuario)
      .then(() => {
        console.log('Usuario Registrado');

        // Crear el usuario en Firebase Authentication
        this.afAuth
          .createUserWithEmailAndPassword(usuario.email, usuario.password)
          .then(() => {
            this.messageServices.add({
              severity: 'success',
              summary: 'Usuario',
              detail: 'Registrado Correctamente',
            });

            this.router.navigate(['home']);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
