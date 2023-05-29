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
    const tokenExists = localStorage.getItem('user_id') !== null;
    const isFirstVisit = localStorage.getItem('isFirstVisit') !== 'false';

    if (!isConnecter && !tokenExists) {
      if (isFirstVisit) {
        localStorage.setItem('isFirstVisit', 'false');
        this.router.navigate(['/page-accueil']);
      } else {
        this.router.navigate(['/connexion']);
      }
    }

    return isConnecter || tokenExists;
  }
}
