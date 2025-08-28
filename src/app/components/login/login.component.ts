import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  emailError: string = '';
  passwordError: string = '';

  constructor(private router: Router, private loginService: LoginService) {}

  login() {
    this.clearErrors();

    // Validazioni
    if (!this.email) {
      this.emailError = 'Inserisci la tua email';
    }
    if (!this.password) {
      this.passwordError = 'Inserisci la password';
    }
    if (this.emailError || this.passwordError) return;

    this.loginService.login(this.email, this.password).subscribe({
      next: () => {
        // Login avvenuto con successo, reindirizza
        if (this.loginService.isAdmin()) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: () => {
        this.errorMessage = 'Email o password non validi';
      }
    });
  }

  clearErrors() {
    this.errorMessage = '';
    this.emailError = '';
    this.passwordError = '';
  }

  onInputChange() {
    // resetta errori live mentre l’utente digita
    this.clearErrors();
  }
}

