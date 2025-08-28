import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/environments';

interface LoginResponse {
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.apiURL}/api/auth/login`;
  private userSubject = new BehaviorSubject<LoginResponse | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) this.userSubject.next(JSON.parse(savedUser));
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { email, password }).pipe(
      tap(user => {
        // salva email, password in chiaro e role
        const userWithPasswordAndRole = {
          email: user.email,
          password,       // password in chiaro
          role: user.role // ruolo restituito dal backend
        };
        sessionStorage.setItem('user', JSON.stringify(userWithPasswordAndRole));
        this.userSubject.next(userWithPasswordAndRole);
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getUser(): LoginResponse | null {
    return this.userSubject.value;
  }

  isAdmin(): boolean {
    return this.userSubject.value?.role === 'ADMIN';
  }
}
