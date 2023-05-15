import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CheckLoginGuard } from './shared/guards/check-login.guard';
import { CreateUserComponent } from './components/create-user/create-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
    canActivate: [CheckLoginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [CheckLoginGuard],
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./components/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
