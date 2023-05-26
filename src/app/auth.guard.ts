import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const isConnecter = this.userService.isConnecter();
    if (!isConnecter) {
      this.router.navigate(['/connexion']);
    }
    return isConnecter;
  }
}
