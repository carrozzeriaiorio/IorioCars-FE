import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auto } from '../app/models/auto.model';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AutoService {
  private apiUrl = `${environment.apiURL}/api/auto`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const userJson = sessionStorage.getItem('user');

    if (!userJson) {
      throw new Error('Autenticazione mancante: effettua il login per continuare.');
    }

    const user = JSON.parse(userJson);
    const email = user.email;
    const password = user.password;

    if (!email || !password) {
      throw new Error('Credenziali incomplete: effettua nuovamente il login.');
    }

    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${email}:${password}`)
    });
  }

  getAll(): Observable<Auto[]> {
    return this.http.get<Auto[]>(this.apiUrl);
  }

  getById(id: number): Observable<Auto> {
    return this.http.get<Auto>(`${this.apiUrl}/${id}`);
  }

  // Crea una nuova auto
  create(auto: Auto, file?: File): Observable<Auto> {
    const headers = this.getAuthHeaders();
    const formData = new FormData();
    formData.append('auto', new Blob([JSON.stringify(auto)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.http.post<Auto>(this.apiUrl, formData, { headers });
  }

  // Aggiorna un’auto esistente
  update(id: number, auto: Auto, file?: File): Observable<Auto> {
    const headers = this.getAuthHeaders();
    const formData = new FormData();
    formData.append('auto', new Blob([JSON.stringify(auto)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }

    return this.http.put<Auto>(`${this.apiUrl}/${id}`, formData, { headers });
  }

  // Elimina un’auto
  delete(id: number): Observable<void> {
    const headers = this.getAuthHeaders();

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
