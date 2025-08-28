import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  loggedIn = !!sessionStorage.getItem('user'); // controllo login

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    // Aggiorna stato login automaticamente tramite BehaviorSubject
    this.loginService.user$.subscribe(user => {
      this.loggedIn = !!user;
    });
  }

  goHome() {
    this.router.navigate(['/']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' }); // scrolla in alto
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
