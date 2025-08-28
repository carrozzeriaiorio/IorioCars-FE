import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private router: Router) {}

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

    // Salva le credenziali sul sessionStorage
    sessionStorage.setItem('user', JSON.stringify({ email: this.email }));

    // Reindirizza alla dashboard/admin
    this.router.navigate(['/admin']);
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

