import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    // Aggiorna stato login automaticamente tramite BehaviorSubject
    this.loginService.user$.subscribe(user => {
      this.loggedIn = !!user;
    });
  }

  logout() {
    this.loginService.logout();
  }
}
