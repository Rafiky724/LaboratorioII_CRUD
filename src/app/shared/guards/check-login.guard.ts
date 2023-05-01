import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  constructor(private authSvc: AuthService,
    private router: Router){}

  canActivate(): boolean {
    if (this.authSvc.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
